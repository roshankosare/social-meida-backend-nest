import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { abort } from 'process';
import { HttpResponse } from 'src/common/httpResponse';
import { UserProfileEntity } from './entity/user-profile.entity';
import { UserProfileDatabaseService } from './user-profile-database-service/user-profile-database.service';
import { UpdateUserProfileMongoDto } from './user-profile-dto/updateUser.mongo.dto';
import { UpdateUserProfileDto } from './user-profile-dto/user-profile-update.dto';
import { CreateUserProfilelDto } from './user-profile-dto/user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly userProfileDatabaseService: UserProfileDatabaseService,
  ) {}

  async createUserProfile(userProfile: CreateUserProfilelDto) {
    const newUserProfile: UserProfileEntity = {
      email: userProfile.email,
      username: userProfile.username,
      name: '',
      displayImage: '',
      userId: userProfile.userId,
      createdAt: new Date(),
      followers: [],
      following: [],
      contact: '',
      about: '',
      posts: [],
    };

    return this.userProfileDatabaseService.createOne(newUserProfile);
  }

  async findUserProfileById(id: string) {
    const result = await this.userProfileDatabaseService.findOne(id);
    return new HttpResponse({
      success: true,
      message: 'fetched profile..',
      statusCode: HttpStatus.OK,
      data: result,
    });
  }

  async findUserProfileAndUpdate(
    userId: string,
    updatedUserProfile: UpdateUserProfileDto,
  ) {
    const result = await this.userProfileDatabaseService.findOneAndUpdate(
      userId,
      updatedUserProfile,
    );
    if (result)
      return new HttpResponse({
        success: true,
        statusCode: HttpStatus.OK,
        data: result,
        message: 'user Profile updated successfully',
      });

    return new HttpResponse({
      success: true,
      statusCode: HttpStatus.OK,
      data: result,
      message: 'user not found',
    });
  }

  //   async UserProfileUpdate(
  //     userId: string,
  //     updatedUserProfile: UpdateUserProfileDto,
  //   ) {
  //    const result  await this.userProfileDatabaseService.findOneAndUpdate(
  //       userId,
  //       updatedUserProfile,
  //     );
  //   }
}
