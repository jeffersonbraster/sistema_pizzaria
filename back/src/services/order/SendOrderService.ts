import prismaClient from "../../prisma";

interface OrderProps {
  order_id: string;
}

class SendOrderService {
  async execute({ order_id }: OrderProps) {
    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        draft: false,
      },
    });

    return order;
  }
}

export { SendOrderService };
