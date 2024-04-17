import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DocumentSentimentDto, SentenceDto } from '../dto/sentimental.dto';

@Schema({ timestamps: true })
export class SentimentalAnalysis extends Document {
  @Prop({ type: DocumentSentimentDto, required: true })
  documentSentiment: DocumentSentimentDto;

  @Prop({ required: true })
  language: string;

  @Prop({ type: Array<SentenceDto>, required: true })
  sentences: Array<SentenceDto>;

  createdAt: Date;

  updatedAt: Date;
}

export const SentimentalAnalysisSchema = SchemaFactory.createForClass(SentimentalAnalysis);