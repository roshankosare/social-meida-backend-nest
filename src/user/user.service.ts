import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserDatabaseService } from './user-database-service/user-database.service';
import { v4 as uuid } from 'uuid';
import { UserProfileService } from 'src/user-profile/user-profile.service';
import { CreateUserProfilelDto } from 'src/user-profile/user-profile-dto/user-profile.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userDatabaseService: UserDatabaseService,
    private readonly userProfileService: UserProfileService,
  ) {}

  async createUser(user: CreateUserDto) {
    const newUser: UserEntity = {
      userId: uuid(),
      email: user.email,
      password: user.password,
      username: user.username,
    };
    const result = await this.userDatabaseService.createUser(newUser);

    const userProfileDto: CreateUserProfilelDto = {
      email: result.email,
      userId: result.userId,
      username: result.username,
    };

    return this.userProfileService.createUserProfile(userProfileDto);
  }

  async findOne(param: {}) {
    return await this.userDatabaseService.findOne(param);
  }

  deleteUserById(Id: string) {}
}
