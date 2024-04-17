import { Module } from '@nestjs/common';
import { SentimentalAnalysisModule } from './sentimental-analysis/sentimental-analysis.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/${process.env.NODE_ENV || 'dev'}.env`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGO_DB'),
        maxPoolSize: 10,
        autoIndex: false,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000
      }),
      inject: [ConfigService],
    }),
    SentimentalAnalysisModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
