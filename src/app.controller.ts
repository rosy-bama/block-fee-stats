import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('fees')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('latest')
  async getStatsForLatestBlock() {
    return await this.appService.findStatsForLatestBlock();    
  }

  @Get(':id')
  async getStatsByBlockId(@Param('id') id) {   
    return await this.appService.findStatsByBlockId(id);
  }

  
}
