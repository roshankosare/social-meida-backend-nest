export interface UserProfileEntity {
  name: string;
  username: string;
  email: string;
  userId: string;
  displayImage: string;
  createdAt: Date;
  followers: string[];
  following: string[];
  contact: string;
  about: string;
  posts:string[];
}
