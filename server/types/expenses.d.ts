interface CreateExpense {
  description: string;
  date: string;
  amount: number;
  categoryId: number;
}
interface UpdateExpense extends CreateExpense {
  id: number;
}
