import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommentMongoEntity, CommentSchema } from "./entity/comment.entity-mongo";


@Module({
    imports:[ MongooseModule.forFeature([
        { name: CommentMongoEntity.name, schema:CommentSchema  },
      ]),],
    controllers:[],
    providers:[],
    exports:[]
})
export class CommentModule{}