import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { Utils } from '../utils/app.utils';
import { Helper } from '../helpers/helper';
import { PrismaService } from '../services/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, Helper, Utils],
})
export class AppModule {}
