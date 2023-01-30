import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { Request, Response } from 'express';
import { CurrentUser } from 'src/common/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';

import {v4 as uuid} from "uuid"
import * as path from 'path';
import { join } from 'path';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:"./postimages",
      filename:(req,file,cb)=>{
        const fileExtension:string = path.extname(file.originalname);
        const fileName:string = uuid() + fileExtension;
        cb(null,fileName);
      }
    })
  }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() post: CreatePostDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {

    const currentUser = <CurrentUser>req.user;

    const fileName = file?.filename;
    const imagesFolderPath = join(process.cwd(),"postimages");
    const imageFullPath = join(imagesFolderPath,fileName);
    post.image = imageFullPath;
    const response = await this.postService.createPost({
      postDto: post,
      userId: currentUser.userId,
    });
    return res.status(response.statusCode).json({ ...response });
  }

  @Get('/test')
  async test() {
    return 'hiii';
  }

  @Get()
  async getAllPosts(@Req() req: Request, @Res() res: Response) {
    const response = await this.postService.getPosts();
    return res.status(response.statusCode).json({ ...response });
  }
  @Get(':id')
  async getPost(
    @Param('id') postId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await this.postService.getPostById(postId);
    return res.status(response.statusCode).json({ ...response });
  }

  @Put(':id')
  async updatePostById() {}
}
