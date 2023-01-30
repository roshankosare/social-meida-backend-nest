import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import {
  PostMongoEntity,
  PostDocument,
} from '../entity/post-mongo-entity/post.entity.mongo';
import { PostEntity } from '../entity/post.entity';

@Injectable()
export class PostDatabaseService {
  constructor(
    @InjectModel(PostMongoEntity.name) private PostModel: Model<PostDocument>,
  ) {}

  async getAll(): Promise<Promise<PostDocument>[]> {
    return await this.PostModel.aggregate([
      {
        $lookup: {
          localField: 'autherId',
          foreignField: 'userId',
          from: 'userprofilemongoentities',
          as: 'auther',
          pipeline: [
            {
              $project: {
                username: 1,
                displayImage: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: '$auther',
      },
      {
        $project: {
          comments: 0,
        },
      },
    ]);
  }

  async find(param: {}): Promise<Promise<PostDocument>[]> {
    return await this.PostModel.find(param);
  }
  async findOne(param: {}): Promise<PostEntity> {
    return await this.PostModel.findOne(param);
  }

  async createOne(post: PostEntity): Promise<PostDocument> {
    const result = await this.PostModel.create(post);
    await result.save();

    return result;
  }

  updateOne() {}
  deleteOne() {}
}
