import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class DocumentSentimentDto {
  @ApiProperty({
    example: 0.8,
    description: 'The magnitude of the sentiment'
  })
  magnitude: number;

  @ApiProperty({
    example: -0.8,
    description: 'The score of the sentiment'
  })
  score: number;
}

export class TextDto {
  @ApiProperty({
    example: "i'm bad",
    description: 'The content of the text'
  })
  content: string;

  @ApiProperty({
    example: -1,
    description: 'The offset of the text within the document'
  })
  beginOffset: number;
}

export class SentenceDto {
  @ApiProperty({
    example: {
      content: "i'm bad",
      beginOffset: -1
    },
    description: 'The text of the sentence and its offset'
  })
  text: TextDto;

  @ApiProperty({
    example: {
      magnitude: 0.8,
      score: -0.8
    },
    description: 'The sentiment of the sentence'
  })
  sentiment: DocumentSentimentDto;
}

export class SentimentalAnalysisResponseDto {
  @ApiProperty({
    example: {
      magnitude: 0.8,
      score: -0.8
    },
    description: 'The sentiment of the document'
  })
  documentSentiment: DocumentSentimentDto;

  @ApiProperty({
    example: 'en',
    description: 'The language of the document'
  })
  language: string;

  @ApiProperty({
    example: [
      {
        text: {
          content: "i'm bad",
          beginOffset: -1
        },
        sentiment: {
          magnitude: 0.8,
          score: -0.8
        }
      }
    ],
    description: 'Sentences in the document with their sentiment'
  })
  sentences: SentenceDto[];
}

export class SentimentalAnalysisDto {
  @ApiProperty({
    example: {
      magnitude: 0.8,
      score: -0.8
    },
    description: 'The sentiment of the document'
  })
  documentSentiment: DocumentSentimentDto;

  @ApiProperty({
    example: 'en',
    description: 'The language of the document'
  })
  language: string;

  @ApiProperty({
    example: [
      {
        text: {
          content: "i'm bad",
          beginOffset: -1
        },
        sentiment: {
          magnitude: 0.8,
          score: -0.8
        }
      }
    ],
    description: 'Sentences in the document with their sentiment'
  })
  sentences: SentenceDto[];

  @ApiProperty({
    example: '2024-04-17T13:16:32.858Z',
    description: 'The creation timestamp of the document'
  })
  createdAt: string;

  @ApiProperty({
    example: '2024-04-17T13:16:32.858Z',
    description: 'The last update timestamp of the document'
  })
  updatedAt: string;

  @ApiProperty({
    example: '661fcbb071c3c06c6b39b35e',
    description: 'Version of the document'
  })
  _id: string;
}

export const DocumentTypeText = 'PLAIN_TEXT';
