import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express/multer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { GlobalJwtModule } from './jwt/jwt.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/social-media'),
    AuthModule,
    PostModule,
    GlobalJwtModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
