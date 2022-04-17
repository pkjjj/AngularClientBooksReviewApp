import { Book } from "./book";

export interface ReviewResponse {
  id?: string;
  description: string;
  created: Date;
  rating?: number;
  bookId: string;
  userToken: string;
  isOverflow?: boolean;
}
