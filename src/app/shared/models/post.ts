export interface Post {
  id?: string;
  author?: string;
  userId?: string;
  username?: string;
  userEmail?: string;
  userImg?: string;
  datePosted?: number;
  topic?: string;
  type?: string;
  title?: string;
  content?: string;
  imgUrl?: string;
  // Ab hier nur für Front-end
  isHovered?: boolean;
}
