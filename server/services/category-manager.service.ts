import CustomError from "../utils/custom-error";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CategoryManagerService {
  // create new category manager
  async create(data: CreateCategory, userId: number) {
    if (!data.name) throw new CustomError("category name is required", 400); // validation

    try {
      const newCategory = await prisma.category.create({
        data: {
          name: data.name,
          userId,
          allocated: data.amountAllocated,
          limit: data.amountLimit,
        },
      });

      return { category: newCategory };
    } finally {
      await prisma.$disconnect();
    }
  }

  // update an existing category
  async update(data: UpdateCategory, categoryId: number) {
    try {
      // Check if category exists
      const existingCategory = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!existingCategory)
        throw new CustomError("category does not exist", 404); // throw an error if it doesn't exist

      // update the db
      const newCategory = await prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          name: data.name,
          allocated: data.amountAllocated,
          limit: data.amountLimit,
        },
      });

      return { category: newCategory };
    } finally {
      await prisma.$disconnect();
    }
  }

  // retrieve a category
  async get(id: number) {
    try {
      // check if it exists
      const existingCategory = await prisma.category.findUnique({
        where: { id },
      });

      if (!existingCategory || existingCategory === null) {
        throw new CustomError("category does not exist", 404);
      }

      // return category if it exists
      return { category: existingCategory };
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(id: number) {
    try {
      // existence check
      const existingCategory = await prisma.category.findUnique({
        where: { id },
      });

      if (!existingCategory || existingCategory === null) {
        throw new CustomError("category does not exist", 404);
      }

      await prisma.category.delete({ where: { id } }); // delete the category if it exists

      return true;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new CategoryManagerService();
