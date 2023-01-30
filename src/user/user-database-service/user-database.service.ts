import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserEntity } from '../entity/user.entity';
import { UserMongoEntity, UserDocument } from '../entity/user.entity.mongo';

@Injectable()
export class UserDatabaseService {
  constructor(
    @InjectModel(UserMongoEntity.name) private UserModel: Model<UserDocument>,
  ) {}

  async findOne(value: any): Promise<UserDocument> {
    return await this.UserModel.findOne(value);
  }

  async createUser(user: UserEntity): Promise<UserDocument> {
    const newUser = await this.UserModel.create(user);

    await newUser.save();

    return newUser;
  }
}
