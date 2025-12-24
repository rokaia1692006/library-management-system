import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ErrormsgComponent } from '../../../../shared/components/errormsg/errormsg.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  imports: [CommonModule, FormsModule, NgFor, NgIf,MatIcon,ReactiveFormsModule, ErrormsgComponent, RouterLink],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
searchQuery: string = '';
selectedCategory: Book['category'] | 'All' = 'All';
categories: (Book['category'] | 'All')[] = ['All', 'Science', 'Art', 'Religion', 'History', 'Geography'];
editingIndex:number|null=null;
showNewBookForm = false;

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

NewBookForm = new FormGroup({
  Bookname : new FormControl('',Validators.required),
  authorName : new FormControl('',Validators.required),
  Category : new FormControl('',Validators.required),
  Quantity : new FormControl(0,Validators.required),
  Publisher : new FormControl('',Validators.required),
  Price : new FormControl(0,Validators.required)
});

openForm(){
  this.showNewBookForm = true;
}

closeForm(){
  this.showNewBookForm = false;
}

openEdit(book:Book,index:number){
this.editingIndex=index;
this.NewBookForm.patchValue({
Bookname:book.title,
authorName:book.authors.join(', '),
Category:book.category,
Quantity:book.stock,
Publisher:book.publisher,
Price:book.price
});
this.showNewBookForm=true;
}
getValues(){
  this.NewBookForm.markAllAsTouched();
  if(this.NewBookForm.invalid)
    return;

  const qty=this.NewBookForm.value.Quantity!;

  if(this.editingIndex!==null){
    if(qty<0)
      return;
    this.books[this.editingIndex]={
    ...this.books[this.editingIndex],
    title:this.NewBookForm.value.Bookname!,
    authors:this.NewBookForm.value.authorName!.split(','),
      category: this.NewBookForm.get('Category')?.value! as 'Science' | 'Art' | 'Religion' | 'History' | 'Geography',
    stock:qty,
    publisher:this.NewBookForm.value.Publisher!,
    price:this.NewBookForm.value.Price!
  };
  }else{
    this.books.push({
    isbn:crypto.randomUUID(),
    title:this.NewBookForm.value.Bookname!,
    authors:this.NewBookForm.value.authorName!.split(','),
    publisher:this.NewBookForm.value.Publisher!,
    year:new Date().getFullYear(),
    price:this.NewBookForm.value.Price!,
      category: this.NewBookForm.get('Category')?.value! as 'Science' | 'Art' | 'Religion' | 'History' | 'Geography',
    stock:qty,
    threshold:10
    });
  }

  this.filteredBooks=[...this.books];
  this.closeForm();
}
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
increaseStock(index: number) {
  this.books[index].stock++;
  this.filterBooks();
}

decreaseStock(index: number) {
  if (this.books[index].stock > 0) this.books[index].stock--;
  this.filterBooks();
}
sortByLowestStock() {
  this.filteredBooks = [...this.filteredBooks].sort((a, b) => a.stock - b.stock);
}

}
