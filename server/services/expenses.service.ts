import CustomError from "../utils/custom-error";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ExpensesService {
  // create a new expense
  async create(data: CreateExpense, userId: number) {
    try {
      if (!data) throw new CustomError("Invalid input", 400); // check if input is sent from frontend

      const newExpense = await prisma.expenses.create({
        data: {
          date: data.date,
          categoryId: data.categoryId,
          amount: data.amount,
          userId,
          description: data.description,
        },
      });

      return { expense: newExpense };
    } finally {
      await prisma.$disconnect();
    }
  }

  // retrieve an expense
  async get(id: number) {
    try {
      // check if expense exists
      const existingExpense = await prisma.expenses.findUnique({
        where: { id },
      });

      if (!existingExpense)
        throw new CustomError("expense does not exist", 404);

      // return expense if it exists
      return { expense: existingExpense };
    } finally {
      await prisma.$disconnect();
    }
  }

  async getByUser(id: number, categoryId: number) {
    try {
      // check if it exists
      const existingeExpense = await prisma.expenses.findMany({
        where: { userId: id, categoryId },
      });

      if (!existingeExpense || existingeExpense === null) {
        throw new CustomError("expense does not exist", 404);
      }

      // return expense if it exists
      return { expenses: existingeExpense };
    } finally {
      await prisma.$disconnect();
    }
  }

  // delete an expense
  async delete(id: number) {
    try {
      // check if expense exists
      const existingExpense = await prisma.expenses.findUnique({
        where: { id },
      });
      if (!existingExpense)
        throw new CustomError("expense does not exist", 404);

      await prisma.expenses.delete({ where: { id } }); // delete the expense if it exists

      return true;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new ExpensesService();
