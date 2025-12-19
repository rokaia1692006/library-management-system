export interface Order {
  id: number;
  bookIsbn: string;
  quantity: number;
  status: 'Pending' | 'Confirmed';
  date: Date;
}
