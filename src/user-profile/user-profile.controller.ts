import { Controller, Get, Param, Put, Req, Res } from "@nestjs/common";
import { UserProfileService } from "./user-profile.service";
import { Request,Response } from "express"
import { CurrentUser } from "src/common/types";
import { Body } from "@nestjs/common/decorators";
import { UpdateUserProfileDto } from "./user-profile-dto/user-profile-update.dto";



@Controller("user")
export class UserProfileController {
    constructor(private readonly userProfileService:UserProfileService){}


    @Get("/:id")
    async findOneUserById(  @Param('id') userId: string,@Req() req: Request,
    @Res() res: Response,){
       const result = await this.userProfileService.findUserProfileById(userId);
       return res.status(result.statusCode).json(result)
        
    }

    @Put("/:id")
    async findOneAndUpdate(@Body() updateUserDto:UpdateUserProfileDto, @Param('id') userId: string,@Req() req: Request,
    @Res() res: Response,){
        const result = await this.userProfileService.findUserProfileAndUpdate(userId,updateUserDto);
        return res.status(result.statusCode).json(result);
    }
    
}