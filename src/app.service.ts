import { Injectable } from '@nestjs/common';
import { Utils } from './app.utils';
import { Operation } from './dto';
import { Helper } from './helper';
const axios = require('axios')


@Injectable()
export class AppService {
  constructor(private readonly utils: Utils){}

  async findStatsForLatestBlock(): Promise<object>{
    try {
      const hash = await this.utils.getLatestBlockHash();
      const blockId = await this.utils.getBlockId(hash);

      return await this.findStatsByBlockId(blockId)
    } catch (error) {
      console.error(error.message);
    }
  }

  async findStatsByBlockId(id): Promise<object>{
    const fees = await this.utils.getBlockFees(id);
    const results = await this.utils.getResults(fees)

    await this.utils.saveBlock(id, results)

    return results;
  }

}
