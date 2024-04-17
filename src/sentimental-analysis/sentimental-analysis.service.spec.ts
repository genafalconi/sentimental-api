import { Test, TestingModule } from '@nestjs/testing';
import { SentimentalAnalysisService } from './sentimental-analysis.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SentimentalAnalysis } from '../schemas/sentimental-analysis.schema';

describe('SentimentalAnalysisService', () => {
  let service: SentimentalAnalysisService;
  let model: Model<SentimentalAnalysis>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SentimentalAnalysisService,
        {
          provide: getModelToken(SentimentalAnalysis.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          }
        },
      ],
    }).compile();

    service = module.get<SentimentalAnalysisService>(SentimentalAnalysisService);
    model = module.get<Model<SentimentalAnalysis>>(getModelToken(SentimentalAnalysis.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call analyzeSentiment method of client with correct message', async () => {
    const message = "I'm good";
    const expectedResult = {
      "sentences": [
        {
          "text": {
            "content": "i'm good",
            "beginOffset": -1
          },
          "sentiment": {
            "magnitude": 0.8999999761581421,
            "score": 0.8999999761581421
          }
        }
      ],
      "documentSentiment": {
        "magnitude": 0.8999999761581421,
        "score": 0.8999999761581421
      },
      "language": "en"
    };

    jest.spyOn(service, 'getSentimentalAnalysis').mockResolvedValue(expectedResult);

    const result = await service.getSentimentalAnalysis(message);
    expect(result).toBe(expectedResult);
  });

  it('should call find method of model', async () => {
    const expectedResult = [{
      "_id": "662015d196ffc28ee01c2714",
      "documentSentiment": {
        "magnitude": 0.8999999761581421,
        "score": 0.8999999761581421
      },
      "language": "en",
      "sentences": [
        {
          "text": {
            "content": "i'm good",
            "beginOffset": -1
          },
          "sentiment": {
            "magnitude": 0.8999999761581421,
            "score": 0.8999999761581421
          }
        }
      ],
      "createdAt": "2024-04-17T18:32:49.826Z",
      "updatedAt": "2024-04-17T18:32:49.826Z",
      "__v": 0
    }];

    jest.spyOn(service, 'getSavedSentimentAnalysis').mockResolvedValue(expectedResult);

    const result = await service.getSavedSentimentAnalysis();

    expect(result).toBe(expectedResult);
  });
});
