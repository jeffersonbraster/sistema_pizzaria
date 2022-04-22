import prismaClient from "../../prisma";

interface OrderProps {
  order_id: string;
}

class DetailOrderService {
  async execute({ order_id }: OrderProps) {
    const orders = await prismaClient.item.findMany({
      where: {
        order_id,
      },
      include: {
        product: true,
        order: true,
      },
    });

    return orders;
  }
}

export { DetailOrderService };
