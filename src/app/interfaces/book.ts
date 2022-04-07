import { Review } from "./review";

export interface Book {
  id: string;
  name: string;
  author: string;
  created: Date;
  pageSize: number;
  description: string;
  imageCover: string;
  rating: number;
  reviews: Review[];
}
