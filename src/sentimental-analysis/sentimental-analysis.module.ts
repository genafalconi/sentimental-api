import { Module } from '@nestjs/common';
import { SentimentalAnalysisController } from './sentimental-analysis.controller';
import { SentimentalAnalysisService } from './sentimental-analysis.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SentimentalAnalysis, SentimentalAnalysisSchema } from '../schemas/sentimental-analysis.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SentimentalAnalysis.name, schema: SentimentalAnalysisSchema }])
  ],
  controllers: [SentimentalAnalysisController],
  providers: [SentimentalAnalysisService]
})
export class SentimentalAnalysisModule { }
