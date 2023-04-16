import { Injectable } from '@nestjs/common';


import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { CreateCategoryDTO } from './DTOs/createCategory.DTO';
import { UpdateCategoryDTO } from './DTOs/UpdateCategory.DTO';

@Injectable()
export class CategoryService{
    
  

  constructor(private readonly prismService:PrismaService){}

  
  async Categories(){
    return await this.prismService.category.findMany({include:{Doctors:{include:{User:true}}}})
  }

  async CreateCatgory(createCategoryDTO:CreateCategoryDTO){
    if(await this.prismService.category.findUnique({where:createCategoryDTO}) == null){
      return await this.prismService.category.create({data:createCategoryDTO , include:{Doctors:true}})
    }
    throw new BadRequestException("This Category Name is Already Taken")
  }
  async UpdateCategory(updateCategoryDTO:UpdateCategoryDTO , CategoryId:string){
    if(await this.prismService.category.findFirst({where:{Id:CategoryId} , include:{Doctors:true}}) != null){
      if((await this.prismService.category.findFirst({where:{Name:updateCategoryDTO.Name , NOT:{Id:CategoryId}}})) == null){
        const category = await this.prismService.category.update({where:{Id:CategoryId} , data:updateCategoryDTO})
        return category
      }
   
      throw new BadRequestException("This Category Name is Already Taken")

    }
    throw new NotFoundException("No categories with this ID")
  }
}