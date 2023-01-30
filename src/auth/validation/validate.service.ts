import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { SignInUserDto } from "src/user/dto/signIn-user.dto";

@Injectable()
export class ValidateUserService {

    validateCreateUserDto(user:CreateUserDto){
        const error:string[] = [];
        const {username ,email,password} = user;
        if(username === undefined || null || "") 
        error.push("username is required");

        if(email === undefined || null || "")
        error.push("email is required");

        if(password === undefined || null || "")
        error.push("password is required");

        return error;
    }
    validateSignInUserDto(user:SignInUserDto){
        const error:string[] = [];
        const {email,password} = user;
       

        if(email === undefined || null || "")
        error.push("email is required");

        if(password === undefined || null || "")
        error.push("password is required");
        
        return error;
    }
}