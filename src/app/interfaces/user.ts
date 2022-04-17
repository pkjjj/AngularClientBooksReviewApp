import { Book } from "./book";
import { Review } from "./review";

export interface User {
  id: string;
  name: string;
  avatar: string;
  token: string;
  reviews: Review[];
  books: Book[];
}
