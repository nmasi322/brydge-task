interface CreateExpense {
  description: string;
  date: Date;
  amount: number;
  categoryId: number;
}
interface UpdateExpense extends CreateExpense {
  id: number;
}
