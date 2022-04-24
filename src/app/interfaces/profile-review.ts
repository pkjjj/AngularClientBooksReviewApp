export interface ProfileReview {
  id: string;
  description: string;
  rating: number;
  created: Date;
  bookId: string;
  bookName: string;
  bookAuthor: string;
  bookDateCreated: Date;
  bookPageSize: number;
  bookDescription: string;
  bookImageCover: string;
  bookRating: number;
}
