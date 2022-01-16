import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Operation } from "./dto";
import { Helper } from "./helper";

@Injectable()
export class Utils{
    constructor(private readonly helper: Helper){}

    LATEST_BLOCK_URL = "https://tez.nodes.ejaraapis.xyz/chains/main/blocks/";
    // Other Methods

  async getUrlResponse(url: string){
    try {
      return await axios.get(url)
    } catch (error) {
      console.error(error)
    }
  }

  async getLatestBlockHash(): Promise<string>{
      const response = await this.getUrlResponse(this.LATEST_BLOCK_URL)
      return response.data[0][0]
  }

  async getBlockId(hash): Promise<string>{
    const block = await this.getUrlResponse(this.LATEST_BLOCK_URL+hash)
    const blockId: string = String(block.data.header.level);
    console.log(`BlockID: ${blockId}`);
    return await blockId;
  }

  async getBlockHash(id): Promise<string>{
    const block = await this.getUrlResponse(this.LATEST_BLOCK_URL+id)
    const blockHash: string = String(block.data.hash);
    console.log(`BlockHash: ${blockHash}`);
    return await blockHash;
  }
  
  async getBlock(id){
    const block = await this.getUrlResponse(this.LATEST_BLOCK_URL+id)
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

  async getResults(fees){
    return {
      min: await this.getMinFee(fees),
      max: await this.getMaxFee(fees),
      average: await this.calculateAverage(fees),
      median: await this.calculateMedianFee(fees)
    };
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

  // DB services
  async saveBlock(id, results){
    const data = {
      level : Number(id),
      hash: await this.getBlockHash(id),
      min: results.min,
      max: results.max,
      average: results.average,
      median: results.median
    }

    return await this.helper.createBlock(data)
  }
}