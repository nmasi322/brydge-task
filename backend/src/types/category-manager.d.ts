interface CreateCategory {
  name: string;
  percentAllocated: number;
  amountAllocated: number;
  percentLimit: number;
  amountLimit: number;
  userId: number;
}
interface UpdateCategory extends CreateCategory {
  id: number;
}
