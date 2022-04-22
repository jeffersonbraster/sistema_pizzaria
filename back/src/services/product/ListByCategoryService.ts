import prismaClient from "../../prisma";

interface ProductProps {
  category_id: string;
}

class ListByCategoryService {
  async execute({ category_id }: ProductProps) {
    const findByCategory = await prismaClient.product.findMany({
      where: {
        category_id,
      },
    });

    return findByCategory;
  }
}

export { ListByCategoryService };
