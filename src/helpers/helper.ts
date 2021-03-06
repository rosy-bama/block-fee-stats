import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../services/prisma.service";

@Injectable()
export class Helper{
    constructor(
        private readonly prisma: PrismaService
    ){}

    async createBlock(data: Prisma.BlockCreateInput){
        const block = await this.prisma.block.findUnique({
            where: {
                level: data.level
            }
        })
        
        if(block){
            return "User Already exist"
        }
        return await this.prisma.block.create({data})
    }
}