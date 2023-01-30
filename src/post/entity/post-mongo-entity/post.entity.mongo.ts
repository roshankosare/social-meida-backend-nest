import {  Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument ,ObjectId} from "mongoose";

import {  PostEntity } from "../post.entity";

export type PostDocument = HydratedDocument<PostMongoEntity>;

@Schema()
export class PostMongoEntity implements PostEntity{
    @Prop()
    postId: string;
    @Prop()
    autherId: string;
    @Prop()
    published: boolean;
    @Prop()
    imageUrl: string;
    @Prop()
    postLikes: number;
    @Prop()
    postDislikes: number;
    @Prop()
    postCaption: string;
    @Prop()
    createdAt: Date;
    @Prop()
    comments:string[]
}


export const PostSchema = SchemaFactory.createForClass(PostMongoEntity);

