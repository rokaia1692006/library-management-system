export interface Book {
  isbn: string;
  title: string;
  authors: string[];
  publisher: string;
  year: number;
  price: number;
  category: 'Science' | 'Art' | 'Religion' | 'History' | 'Geography';
  stock: number;
  threshold: number;
}

