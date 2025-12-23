import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-books',
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
searchQuery: string = '';
  selectedCategory: Book['category'] | 'All' = 'All';
  categories: (Book['category'] | 'All')[] = ['All', 'Science', 'Art', 'Religion', 'History', 'Geography'];

  books: Book[] = [
    {
      isbn: '978-0553380163',
      title: 'A Brief History of Time',
      authors: ['Stephen Hawking'],
      publisher: 'Bantam',
      year: 1988,
      price: 12.99,
      category: 'Science',
      stock: 24,
      threshold: 5
    },
    {
      isbn: '978-0062316097',
      title: 'Sapiens',
      authors: ['Yuval Noah Harari'],
      publisher: 'Harper',
      year: 2011,
      price: 14.99,
      category: 'History',
      stock: 3,
      threshold: 5
    },
    // Add more books here
  ];

  filteredBooks: Book[] = [...this.books];

  filterBooks() {
    this.filteredBooks = this.books.filter(book =>
      (book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
       book.authors.join(' ').toLowerCase().includes(this.searchQuery.toLowerCase()) ||
       book.isbn.includes(this.searchQuery)) &&
      (this.selectedCategory === 'All' || book.category === this.selectedCategory)
    );
  }

  filterCategory(cat: Book['category'] | 'All') {
    this.selectedCategory = cat;
    this.filterBooks();
  }
}
