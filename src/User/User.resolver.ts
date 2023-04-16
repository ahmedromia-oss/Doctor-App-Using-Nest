import { UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "src/auth/auth.service";
import { LoginDto } from "src/auth/DTOs/Login.Dto";
import { RoleAuthGaurd } from "src/auth/guards/RoleAuthGaurd";
import { CurrentUser } from "src/common/Decorators/Current-User.Decorator";
import { Response } from "src/common/Interceptors/Response.Interceptor";
import { serialize } from "src/common/Interceptors/Serialize.Interceptor";
import { NormalResponse } from "src/Models/Doctor.model";
import { UserEntity, UserResponse } from "src/Models/User.model";
import { Role, Roles } from "../common/Decorators/Role-Decorator";
import { CreateUserDTO } from "./DTOs/CreateUser.DTO";
import { UserDTo, UserDToResponse } from "./DTOs/User.DTO";
import { UserService } from "./User.service";
import { RatingDTO } from "./DTOs/Rating.DTO";

import GraphQLUpload = require('graphql-upload/GraphQLUpload.js');
import FileUpload = require('graphql-upload/GraphQLUpload.js');

@Resolver(of=>UserEntity)

export class UserResolver {
       
    constructor(private readonly authservice:AuthService , private readonly userService:UserService){}

    
    @serialize(UserDTo)
    @Response(201 , "Created")
    @Mutation(()=>UserDToResponse)
    async Adduser(@Args('user') user:CreateUserDTO){
        
        const User = this.authservice.signup(user)
        return User
       

    }

    @Roles(Role.User)
    @UseGuards(RoleAuthGaurd)
    @serialize(UserDTo)
    @Response(200 , "Success")
    @Query(()=>UserDToResponse)
    async Userprofile(@CurrentUser() user){
        return this.userService.findUserByEmail(user.username)


    }

    @Roles(Role.User , Role.Doctor)
    @UseGuards(RoleAuthGaurd)
    @Response(201 , "Created")
    @Mutation(()=>NormalResponse)
    async Rate( @Args("data") data:RatingDTO ,  @CurrentUser() user ){

        return await this.userService.AddRating(data, user)
    }
    @Response(200 , "Success")
    @Mutation(()=>NormalResponse)
    async SignUser(@Args({name:"user" , type:()=>LoginDto}) user){
        const Token = this.authservice.signin(user)
        return Token
        

    }
    
    @Response(201 ,"Created" )
    @UseGuards(RoleAuthGaurd)
    @Roles(Role.Doctor , Role.User)
    @Mutation(() => NormalResponse)
    async uploadProfilePhoto(
      @CurrentUser() user, @Args({name: 'file', type: () => GraphQLUpload}) {createReadStream , filename , mimetype}: FileUpload) {
        return (await this.userService.UpdateProfilePhoto({createReadStream , filename , mimetype} , user.sub)).ProfilePhoto
    
        
       
        
    }
}