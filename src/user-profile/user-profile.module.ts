import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/common/auth.middleware';
import {
  UserProfileMongoEntity,
  UserProfileSchema,
} from './entity/user-profile.entity.mongo';
import { UserProfileDatabaseService } from './user-profile-database-service/user-profile-database.service';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserProfileMongoEntity.name, schema: UserProfileSchema },
    ]),
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService,UserProfileDatabaseService],
  exports: [UserProfileService],
})
export class UserProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes();
  }
}
