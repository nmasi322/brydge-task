interface CreateCategory {
  name: string;
  amountAllocated: number;
  amountLimit: number;
  userId: number;
}

interface UpdateCategory {
  name: string;
  amountAllocated: number;
  amountLimit: number;
}

interface Category {
  name: string;
  userId: number;
  allocated: [
    {
      percentAllocated: number;
      amountAllocated: number;
    }
  ];
  limit: [
    {
      percentLimit: number;
      amountLimit: number;
    }
  ];
}
