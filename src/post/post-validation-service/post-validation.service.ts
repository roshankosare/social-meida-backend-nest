import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "../dto/create-post.dto";


@Injectable()
export class PostValidationService{

    validateCreatePostDto(post:CreatePostDto){

        let errors:string[] = []
    //  if(post.image ===  undefined || null)
    //     errors.push("please give image to add in post")

        return errors;


    }
}