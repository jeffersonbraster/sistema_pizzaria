import prismaClient from "../../prisma";

interface OrderProps {
  order_id: string;
}

class RemoveOrderService {
  async execute({ order_id }: OrderProps) {
    const order = await prismaClient.order.delete({
      where: {
        id: order_id,
      },
    });

    return order;
  }
}

export { RemoveOrderService };
