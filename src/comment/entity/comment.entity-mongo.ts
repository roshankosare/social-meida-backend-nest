import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { CommentEntity } from "./comment.entity";

export type CommentDocument = HydratedDocument<CommentMongoEntity>;

@Schema()
export class CommentMongoEntity implements CommentEntity{
    @Prop()
    postId: string;
    @Prop()
    commentId: string;
    @Prop()
    comment: string;
    @Prop()
    commentDate: Date;
}


export const CommentSchema = SchemaFactory.createForClass(CommentMongoEntity);