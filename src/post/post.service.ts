import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpResponse } from 'src/common/httpResponse';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entity/post.entity';
import { PostDatabaseService } from './post-database-service/post-database.service';
import { PostValidationService } from './post-validation-service/post-validation.service';
import { v4 as uuid } from 'uuid';
import { UserProfileService } from 'src/user-profile/user-profile.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postDatabaseService: PostDatabaseService,
    private readonly postValidatiobService: PostValidationService,
    private readonly userProfileService: UserProfileService,
  ) {}
  async createPost(postDtoWithUserId: {
    postDto: CreatePostDto;
    userId: string;
  }) {
    const { postDto, userId } = postDtoWithUserId;

    const errors = this.postValidatiobService.validateCreatePostDto(postDto);
    if (errors.length > 0)
      return new HttpResponse({
        success: false,
        message: 'invalid parameters',
        statusCode: HttpStatus.BAD_REQUEST,
        data: {
          error: errors,
        },
      });

    const newPost: PostEntity = {
      postId: uuid(),
      autherId: userId,
      createdAt: new Date(),
      postCaption:
        postDto.postCaption === undefined || null ? '' : postDto.postCaption,
      imageUrl: postDto.image,
      published: true,
      postLikes: 0,
      postDislikes: 0,
      comments: [],
    };
    const post = await this.postDatabaseService.createOne(newPost);

    const postId = post.postId;

    await this.userProfileService.findUserProfileAndUpdate(userId, {
      addPost: postId,
    });

    return new HttpResponse({
      success: true,
      message: 'post created successfully',
      statusCode: HttpStatus.CREATED,
      data: { post },
    });
  }

  async getPostById(postId: string) {
    const post = await this.postDatabaseService.findOne({ postId });
    return new HttpResponse({
      success: true,
      message: 'fetched data successfully',
      statusCode: HttpStatus.CREATED,
      data: { post },
    });
  }

  async getPosts() {
    const posts = await this.postDatabaseService.getAll();
    return new HttpResponse({
      success: true,
      message: 'fetched data successfully',
      statusCode: HttpStatus.CREATED,
      data: { posts },
    });
  }

  async updatePost() {}
}
