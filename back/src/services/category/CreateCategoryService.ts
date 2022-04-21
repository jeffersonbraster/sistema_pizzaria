import prismaClient from "../../prisma";

interface CategoryProps {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryProps) {
    if (name === "" || name === null) {
      throw new Error("Name is required");
    }

    const category = await prismaClient.category.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export { CreateCategoryService };
