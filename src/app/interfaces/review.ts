import { Book } from "./book";
import { User } from "./user";

export interface Review {
  id?: string;
  description: string;
  created: Date;
  rating?: number;
  book: Book;
  applicationUser: User;
}
