import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';
import { database } from './constants';

beforeAll(async () => {
  await mongoose.connect(database);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('SentimentalAnalysisController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /sentimental-analysis (analyze sentiment)', async () => {
    const message = "I'm feeling great!";
    return await request(app.getHttpServer())
      .get(`/sentimental-analysis?message=${encodeURIComponent(message)}`)
      .expect(200)
      .expect((response) => {
        const responseData = response.body;
        expect(responseData).toHaveProperty('documentSentiment');
        expect(responseData.documentSentiment).toHaveProperty('magnitude');
        expect(responseData.documentSentiment).toHaveProperty('score');
        expect(responseData).toHaveProperty('language');
        expect(responseData).toHaveProperty('sentences');
        expect(responseData.sentences).toBeInstanceOf(Array);
        expect(responseData.sentences.length).toBeGreaterThan(0);
        expect(responseData.sentences[0]).toHaveProperty('text');
        expect(responseData.sentences[0]).toHaveProperty('sentiment');
        expect(responseData.sentences[0].text).toHaveProperty('content', message);
      });
  });

  it('GET /sentimental-analysis/saved (get saved sentimental analysis)', async () => {
    return await request(app.getHttpServer())
      .get('/sentimental-analysis/saved')
      .expect(200)
      .expect((response) => {
        const responseData = response.body;
        expect(responseData).toBeInstanceOf(Array);
        expect(responseData.length).toBeGreaterThanOrEqual(0);
      });
  });
});
