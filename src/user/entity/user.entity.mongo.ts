import { Schema } from '@nestjs/mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose/dist';

import { HydratedDocument } from 'mongoose';
import { UserEntity } from './user.entity';

export type  UserDocument = HydratedDocument<UserMongoEntity>;

@Schema()
export class UserMongoEntity implements UserEntity{
 

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  userId:string
}

export const UserSchema = SchemaFactory.createForClass(UserMongoEntity);
