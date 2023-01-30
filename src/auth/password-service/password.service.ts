import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(plainPassword: string) {
    const hashedPassword = await hash(plainPassword, 12);
    return hashedPassword;
  }

  async comaparePassword(plainPassword:string, hashedPassword:string) {
    const result = await compare(plainPassword, hashedPassword);
    
    return result;
  }
}
