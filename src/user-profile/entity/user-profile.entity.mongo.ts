import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserProfileEntity } from './user-profile.entity';

export type UserProfileDocument = HydratedDocument<UserProfileMongoEntity>;
@Schema()
export class UserProfileMongoEntity implements UserProfileEntity {

  @Prop()
  userId: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  contact: string;

  @Prop()
  followers: string[];

  @Prop()
  following: string[];

  @Prop()
  name: string;

  @Prop()
  displayImage: string;

  @Prop()
  createdAt: Date;

  @Prop()
  about: string;
  @Prop()
  posts: string[];
}

export const UserProfileSchema = SchemaFactory.createForClass(
  UserProfileMongoEntity,
);
