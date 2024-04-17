import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentSentimentDto, DocumentTypeText, SentenceDto, SentimentalAnalysisResponseDto } from '../dto/sentimental.dto';
import { SentimentalAnalysis } from '../schemas/sentimental-analysis.schema';

@Injectable()
export class SentimentalAnalysisService {
  private client: any; // LanguageServiceClient isn't the actual type of client. For compiling reasons I have to declare as any

  constructor(
    @InjectModel(SentimentalAnalysis.name)
    private readonly sentimentalAnalysisModel: Model<SentimentalAnalysis>,
  ) {
    const language = require('@google-cloud/language');
    this.client = new language.LanguageServiceClient();
  }

  public async getSentimentalAnalysis(message: string): Promise<SentimentalAnalysisResponseDto> {
    const document = {
      content: message,
      type: DocumentTypeText
    };

    try {
      Logger.log(`Analyzing sentiment for message: ${message}`, 'getSentimentalAnalysis');
      const [result] = await this.client.analyzeSentiment({ document: document });

      if (result) {
        Logger.log('Sentiment analysis completed.', 'getSentimentalAnalysis');
        await this.saveSentimentAnalysis(result);
      }
      return result;
    } catch (error) {
      Logger.error(`Error analyzing sentiment: ${error}`);
      throw error;
    }
  }

  private async saveSentimentAnalysis(sentimentalData: SentimentalAnalysisResponseDto) {
    try {
      const newSentimentAnalysis = new this.sentimentalAnalysisModel({
        documentSentiment: sentimentalData.documentSentiment,
        language: sentimentalData.language,
        sentences: sentimentalData.sentences
      });
      const savedSentiment = await this.sentimentalAnalysisModel.create(newSentimentAnalysis);

      if (savedSentiment) {
        Logger.log('Sentiment analysis saved.', 'saveSentimentAnalysis');
      } else {
        Logger.log('Couldnt save sentiment analysis.', 'saveSentimentAnalysis');
      }
    } catch (error) {
      Logger.error(`Error saving sentiment analysis. ${error}`);
      throw error;
    }
  }

  public async getSavedSentimentAnalysis(): Promise<Array<SentimentalAnalysisResponseDto>> {
    try {
      let sentimentsToReturn: Array<SentimentalAnalysisResponseDto> = [];
      const savedSentiments = await this.sentimentalAnalysisModel.find();

      if (savedSentiments.length > 0) {
        Logger.log(`There are ${savedSentiments.length} sentiment analysis saved.`, 'getSavedSentimentAnalysis');
        sentimentsToReturn = this.mapToSentimentalAnalysisResponseDto(savedSentiments);
      } else {
        Logger.log('There arent sentiment analysis saved.', 'getSavedSentimentAnalysis');
      }
      return sentimentsToReturn;
    } catch (error) {
      Logger.error(`Error getting saved sentiment analysis. ${error}`);
      throw error;
    }
  }

  private mapToSentimentalAnalysisResponseDto(savedSentiments: SentimentalAnalysis[]): SentimentalAnalysisResponseDto[] {
    return savedSentiments.map(sentiment => {
      const documentSentiment: DocumentSentimentDto = {
        magnitude: sentiment.documentSentiment.magnitude,
        score: sentiment.documentSentiment.score
      };

      const sentences: SentenceDto[] = sentiment.sentences.map(sentence => {
        const text = {
          content: sentence.text.content,
          beginOffset: sentence.text.beginOffset
        };
        const sentimentDto: DocumentSentimentDto = {
          magnitude: sentence.sentiment.magnitude,
          score: sentence.sentiment.score
        };
        return { text, sentiment: sentimentDto };
      });

      return { documentSentiment, language: sentiment.language, sentences };
    });
  };
}
