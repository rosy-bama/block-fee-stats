import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Operation } from './dto';
const axios = require('axios')


@Injectable()
export class AppService {

  constructor(
    private httpService: HttpService){}

  BASE_URL = "https://tez.nodes.ejaraapis.xyz/chains/main/blocks/";

  async findStatsForLatestBlock(): Promise<any>{
    const hash = await this.getLatestBlockHash();
    const blockId = await this.getBlockId(hash);
    const fees = await this.getBlockFees(blockId);   

    return {
      min: await this.getMinFee(fees),
      max: await this.getMaxFee(fees),
      average: await this.calculateAverage(fees),
      median: await this.calculateMedianFee(fees)
    };
  }

  async findStatsByBlockId(id){
    const fees = await this.getBlockFees(id);

    return {
      min: await this.getMinFee(fees),
      max: await this.getMaxFee(fees),
      average: await this.calculateAverage(fees),
      median: await this.calculateMedianFee(fees)
    };
  }


// Other Methods

  async getUrlResponse(url: string){
    try {
      return await axios.get(url)
    } catch (error) {
      console.error(error)
    }
  }

  async getLatestBlockHash(): Promise<string>{
      const response = await this.getUrlResponse(this.BASE_URL)
      return response.data[0][0]
  }

  async getBlockId(hash): Promise<string>{
    const block = await this.getUrlResponse(this.BASE_URL+hash)
    const blockId: string = String(block.data.header.level);
    console.log(`BlockID: ${blockId}`);
    return await blockId;
  }
  
  async getBlock(id){
    const block = await this.getUrlResponse(this.BASE_URL+id)
    return await block.data
  }
  
  async getBlockFees(id){
    const block = await this.getBlock(id)

    const transactionOperations: Operation[] = block.operations[3]
    
    let blockFees: number[] = [];
    
    for (var i in transactionOperations){
      for (var j in transactionOperations[i].contents){
        if(transactionOperations[i].contents[j].kind === "transaction"){
          blockFees.push(Number(transactionOperations[i].contents[j].fee))
        }    
      }
    }

    return blockFees
  }


  // Calculations
  async getMinFee(fees){
    return await Math.min.apply(null, fees)
  }
  async getMaxFee(fees){
    return await Math.max.apply(null, fees)
  }
  async calculateAverage(fees){
    const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
    return await average(fees)
  }

  async calculateMedianFee(fees){
      const mid = Math.floor(fees.length / 2),
        nums = [...fees].sort((a, b) => a - b);
      return await fees.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  }

}
