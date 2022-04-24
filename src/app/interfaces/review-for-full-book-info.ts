import { Review } from "./review";

export interface ReviewForFullBookInfo extends Review {
  id: string;
  description: string;
  rating: number;
  created: Date;
  userName: string;
  userAvatar: string;
  isOverflow: boolean;
}
