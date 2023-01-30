import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CommentDocument,
  CommentMongoEntity,
} from './entity/comment.entity-mongo';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(CommentMongoEntity.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}
  async createComment(comment): Promise<CommentDocument> {
    return await this.commentModel.create(comment);
  }

  async updateOne(values):Promise<CommentDocument>{


   return await this.commentModel.findOneAndUpdate();

  }
}
