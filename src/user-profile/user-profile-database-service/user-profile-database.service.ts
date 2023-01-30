import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProfileEntity } from '../entity/user-profile.entity';
import {
  UserProfileDocument,
  UserProfileMongoEntity,
} from '../entity/user-profile.entity.mongo';
import { UpdateUserProfileMongoDto } from '../user-profile-dto/updateUser.mongo.dto';
import { UpdateUserProfileDto } from '../user-profile-dto/user-profile-update.dto';

@Injectable()
export class UserProfileDatabaseService {
  constructor(
    @InjectModel(UserProfileMongoEntity.name)
    private UserProfileModel: Model<UserProfileDocument>,
  ) {}

  async find(param: any): Promise<Promise<UserProfileDocument>[]> {
    return await this.UserProfileModel.find(param);
  }

  async findOne(userId: string): Promise<UserProfileEntity | any> {
    return await this.UserProfileModel.aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          localField: 'posts',
          foreignField: 'postId',
          from: 'postmongoentities',
          as: 'posts',
          pipeline: [
            {
              $project: {
                postContaint:1,
                postId:1
              },
            },
          ],
        },
      },
    ]);
  }

  async createOne(
    userProfile: UserProfileEntity,
  ): Promise<UserProfileDocument> {
    const newUserProfile = await this.UserProfileModel.create(userProfile);
    return newUserProfile;
  }

  async findOneAndUpdate(id: string, updatedUserProfile: UpdateUserProfileDto) {
    let user: UpdateUserProfileMongoDto = {};
    if (updatedUserProfile.addFollower) {
      if (await this.findOne(updatedUserProfile.addFollower))
        user.$push = { followers: updatedUserProfile.addFollower };
    }
    if (updatedUserProfile.removeFollower) {
      if (await this.findOne(updatedUserProfile.removeFollower))
        user.$push = { followers: updatedUserProfile.removeFollower }; // remove insted of push
    }

    if (updatedUserProfile.addPost) {
      // if(await this.findUserProfileById(updatedUserProfile.addFollower))  check if post exists then add
      user.$push = { posts: updatedUserProfile.addPost };
    }
    if (updatedUserProfile.removePost) {
      // if(await this.findUserProfileById(updatedUserProfile.addFollower))  check if post exists then remove
      user.$push = { posts: updatedUserProfile.removePost };
    }
    if (updatedUserProfile.updatedName) {
      user.$set = { name: updatedUserProfile.updatedName };
    }

    if (updatedUserProfile.updatedAbout) {
      user.$set = { name: updatedUserProfile.updatedAbout };
    }

    const result = await this.UserProfileModel.findOneAndUpdate(
      { userId: id },
      user,
    );
    if(result)
    await result.save();

    return result;
  }

  deleteOne() {}
}
