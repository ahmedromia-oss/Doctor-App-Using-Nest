import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RoleAuthGaurd } from "src/auth/guards/RoleAuthGaurd";
import { Response } from "src/common/Interceptors/Response.Interceptor";
import { CategoryEntity, CategoryResponse, OneCategoryResponse } from "src/Models/Category.model";
import { Role, Roles } from "src/common/Decorators/Role-Decorator";
import { CategoryService } from "./Category.Service";
import { CreateCategoryDTO } from "./DTOs/createCategory.DTO";
import { UpdateCategoryDTO } from "./DTOs/UpdateCategory.DTO";

@Resolver(of=>CategoryEntity)

export class CategoryResolver {
    constructor(private readonly categoryService:CategoryService){}

    @Response(200 , "Success")
    @Query(()=>CategoryResponse)
    async Categories(){
        return await this.categoryService.Categories()
    }

    @Roles(Role.Admin)
    @UseGuards(RoleAuthGaurd)
    @Response(201 , "Created")
    @Mutation(()=>OneCategoryResponse)

    async createCategory(@Args("data") createCategoryDTO:CreateCategoryDTO){

        return await this.categoryService.CreateCatgory(createCategoryDTO)

    }

    @Roles(Role.Admin)
    @UseGuards(RoleAuthGaurd)
    @Response(201 , "Created")
    @Mutation(()=>OneCategoryResponse)
    async UpdateCategory(@Args("id") id:string ,@Args("data") updateCategoryDTO:UpdateCategoryDTO ){
        return await this.categoryService.UpdateCategory(updateCategoryDTO , id)
    }

    

}