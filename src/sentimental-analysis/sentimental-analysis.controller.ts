import { Controller, Get, HttpException, HttpStatus, Inject, Logger, Post, Query } from '@nestjs/common';
import { SentimentalAnalysisService } from './sentimental-analysis.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SentimentalAnalysisDto, SentimentalAnalysisResponseDto } from '../dto/sentimental.dto';

@Controller('sentimental-analysis')
export class SentimentalAnalysisController {

  constructor(
    @Inject(SentimentalAnalysisService)
    private readonly sentimentalAnalysisService: SentimentalAnalysisService
  ) { }

  @ApiTags('Post sentimental-analysis by query message')
  @ApiQuery({ name: 'message', required: true, type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the sentiment analysis result',
    type: SentimentalAnalysisResponseDto
  })
  @Post()
  async getSentimentalAnalysis(@Query('message') message: string): Promise<SentimentalAnalysisResponseDto> {
    try {
      return await this.sentimentalAnalysisService.getSentimentalAnalysis(message);
    } catch (error) {
      throw new HttpException(`An error occurred while fetching sentimental analysis. Error: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('Get all saved sentimental-analysis')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the array of sentiment analysis saved result',
    type: SentimentalAnalysisDto,
    isArray: true
  })
  @Get('/saved')
  async getSavedSentimentalAnalysis(): Promise<Array<SentimentalAnalysisResponseDto>> {
    try {
      return await this.sentimentalAnalysisService.getSavedSentimentAnalysis();
    } catch (error) {
      throw new HttpException(`An error occurred while getting saved sentimental analysis. Error: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('Check for healthy service')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a boolean if the service is active and healthy',
    type: Boolean,
  })
  @Get('/')
  getHealthySentimentalAnalysis(): boolean {
    try {
      Logger.log('Status service is active', 'getHealthySentimentalAnalysis');
      return true;
    } catch (error) {
      Logger.log('Status service is unactive', 'getHealthySentimentalAnalysis');
      return false;
    }
  }
}
