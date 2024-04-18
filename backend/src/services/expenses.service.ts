import CustomError from "../utils/custom-error";

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

class ExpensesService {
  async create(data: CreateExpense) {
    if (!data) throw new CustomError("Invalid input", 400); // check if input is sent from frontend

    const newExpense = await prisma.expenses.create({
      data: {
        date: data.date,
        categoryId: data.categoryId,
        amount: data.amount,
        userId: data.userId,
        description: data.description,
      },
    });

    return { expense: newExpense };
  }

  //   async update(data: UpdateExpense) {
  //     // Check if expense exists
  //     const existingExpense = await prisma.expenses.findUnique({
  //       where: { id: data.id },
  //     });
  //     if (!existingExpense)
  //       throw new CustomError("expense does not exist", 404); // throw an error if it doesn't exist

  //     // update the db
  //     await prisma.expenses.update({
  //       where: { id: existingExepense.id },
  //       data: {
  //         name: data.name,
  //         userId: data.userId,
  //         allocated: {
  //           create: {
  //             percentage: data.percentAllocated,
  //             amount: data.amountAllocated,
  //           },
  //         },
  //         limit: {
  //           create: {
  //             percentage: data.percentLimit,
  //             amount: data.amountLimit,
  //           },
  //         },
  //       },
  //     });

  //     return { expense: existingExpense };
  //   }

  async get(id: number) {
    const existingExpense = await prisma.expenses.findUnique({
      where: { id },
    });
    if (!existingExpense) throw new CustomError("expense does not exist", 404);

    // return expense if it exists
    return { expense: existingExpense };
  }

  async delete(id: number) {
    const existingExpense = await prisma.expenses.findUnique({
      where: { id },
    });
    if (!existingExpense) throw new CustomError("expense does not exist", 404);

    await prisma.expenses.delete({ where: { id } }); // delete the expense if it exists

    return true;
  }
}

export default new ExpensesService();
