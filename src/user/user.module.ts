import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthMiddleware } from "src/common/auth.middleware";
import { UserProfileModule } from "src/user-profile/user-profile.module";
import { UserProfileService } from "src/user-profile/user-profile.service";
import { UserMongoEntity, UserSchema } from "./entity/user.entity.mongo";
import { UserDatabaseService } from "./user-database-service/user-database.service";


import { UserService } from "./user.service";


@Module({
    imports:[MongooseModule.forFeature([{name:UserMongoEntity.name,schema:UserSchema}]),UserProfileModule],
    providers:[UserService,UserDatabaseService],
    exports:[UserService]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes();
    }
  }