

export interface PostEntity {
  postId:string;
  autherId:any;
  published: boolean;
  imageUrl: string;
  postLikes: number;
  postDislikes: number;
  postCaption: string;
  createdAt: Date;
  comments: string[];
}
