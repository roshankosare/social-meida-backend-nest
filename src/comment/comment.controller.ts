import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller()
export class CommentController {

    constructor(private readonly commentService:CommentService){}
  async CreateOne() {
    return;
  }

  async deleteOne() {
    return;
  }

  async UpdateOne() {
    return;
  }
}
