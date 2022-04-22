import prismaClient from "../../prisma";

interface ItemProps {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemService {
  async execute({ order_id, product_id, amount }: ItemProps) {
    const order = await prismaClient.order.findUnique({
      where: {
        id: order_id,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    const item = await prismaClient.item.create({
      data: {
        amount,
        order_id,
        product_id,
      },
    });

    return item;
  }
}

export { AddItemService };
