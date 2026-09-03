import data from "./books.generated.json";

export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string | null;
  rating: number;
  readAt: string | null;
  addedAt: string | null;
  link: string;
  owned: boolean;
  audiobook: boolean;
};

export const booksData = data as unknown as {
  updatedAt: string | null;
  currentlyReading: Book[];
  read: Book[];
  toRead: Book[];
};
