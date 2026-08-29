// The /books page renders books.generated.json, which is rebuilt from the
// Goodreads currently-reading / read / to-read shelves by scripts/fetch-books.mjs
// on every build and on the daily schedule in the deploy workflow. Do not edit.
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
};

export const booksData = data as unknown as {
  updatedAt: string | null;
  currentlyReading: Book[];
  read: Book[];
  toRead: Book[];
};
