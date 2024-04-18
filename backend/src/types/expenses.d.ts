interface CreateExpense {
  description: string;
  date: Date;
  amount: number;
  categoryId: number;
  userId: number;
}
interface UpdateExpense extends CreateExpense {
  id: number;
}
