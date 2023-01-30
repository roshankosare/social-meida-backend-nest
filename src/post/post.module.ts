import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthMiddleware } from 'src/common/auth.middleware';
import { UserProfileModule } from 'src/user-profile/user-profile.module';

import {
  PostMongoEntity,
  PostSchema,
} from './entity/post-mongo-entity/post.entity.mongo';
import { PostDatabaseService } from './post-database-service/post-database.service';
import { PostValidationService } from './post-validation-service/post-validation.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostMongoEntity.name, schema: PostSchema },
    ]),
    UserProfileModule,
    MulterModule.register({
      dest: './postsimages',
    }),
  ],
  controllers: [PostController],
  providers: [PostService, PostDatabaseService, PostValidationService],
  exports: [],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/post/create', method: RequestMethod.POST },
        { path: 'post/:id', method: RequestMethod.POST },
      );
  }
}
