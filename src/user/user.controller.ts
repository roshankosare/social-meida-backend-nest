import { Controller, Get, Post } from "@nestjs/common";




@Controller() 
export class UserController{

    @Get(":id") 
    async getUserById(){

    }

    @Post("id")
    async updateUserById(){

    }

    
}