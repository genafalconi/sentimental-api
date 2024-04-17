import { Test, TestingModule } from '@nestjs/testing';
import { SentimentalAnalysisController } from './sentimental-analysis.controller';
import { SentimentalAnalysisService } from './sentimental-analysis.service';
import { SentimentalAnalysis } from '../schemas/sentimental-analysis.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SentimentalAnalysisResponseDto } from 'src/dto/sentimental.dto';

describe('SentimentalAnalysisController', () => {
  let controller: SentimentalAnalysisController;
  let service: SentimentalAnalysisService;
  let model: Model<SentimentalAnalysis>;

  const sentimentalAnalysis: SentimentalAnalysisResponseDto = {
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

  const mockSentimentalAnalysis = {
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
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SentimentalAnalysisController],
      providers: [
        SentimentalAnalysisService,
        {
          provide: getModelToken(SentimentalAnalysis.name),
          useValue: model
        },
      ],
    }).compile();

    controller = module.get<SentimentalAnalysisController>(SentimentalAnalysisController);
    service = module.get<SentimentalAnalysisService>(SentimentalAnalysisService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getSentimentalAnalysis method of service with correct message', async () => {
    const message = 'Test message';
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

    const result = await controller.getSentimentalAnalysis(message);

    expect(result).toBe(expectedResult);
  });

  it('should call getSavedSentimentalAnalysis method of service', async () => {
    const expectedResult: Array<SentimentalAnalysisResponseDto> = [{
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
      ]
    }];

    jest.spyOn(service, 'getSavedSentimentAnalysis').mockResolvedValue(expectedResult);

    const result = await controller.getSavedSentimentalAnalysis();

    expect(result).toBe(expectedResult);
  });
});
