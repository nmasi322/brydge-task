import CustomError from "../utils/custom-error";

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

class CategoryManagerService {
  async create(data: CreateCategory) {
    if (!data.name) throw new CustomError("category name is required", 400);

    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        userId: data.userId,
        allocated: {
          create: {
            percentage: data.percentAllocated,
            amount: data.amountAllocated,
          },
        },
        limit: {
          create: {
            percentage: data.percentLimit,
            amount: data.amountLimit,
          },
        },
      },
    });

    return { category: newCategory };
  }

  async update(data: UpdateCategory) {
    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: data.id },
    });
    if (!existingCategory)
      throw new CustomError("category does not exist", 404); // throw an error if it doesn't exist

    // update the db
    await prisma.category.update({
      where: { id: existingCategory.id },
      data: {
        name: data.name,
        allocated: {
          create: {
            percentage: data.percentAllocated,
            amount: data.amountAllocated,
          },
        },
        limit: {
          create: {
            percentage: data.percentLimit,
            amount: data.amountLimit,
          },
        },
      },
    });

    return { category: existingCategory };
  }

  async get(id: number) {
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory)
      throw new CustomError("category does not exist", 404);

    // return category if it exists
    return { category: existingCategory };
  }

  async delete(id: number) {
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory)
      throw new CustomError("category does not exist", 404);

    await prisma.category.delete({ where: { id } }); // delete the category if it exists

    return true;
  }
}

export default new CategoryManagerService();
