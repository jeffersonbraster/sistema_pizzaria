import prismaClient from "../../prisma";

interface OrderProps {
  table: number;
  name: string;
}

class CreateOrderService {
  async execute({ table, name }: OrderProps) {
    const order = await prismaClient.order.create({
      data: {
        table,
        name,
      },
    });

    return order;
  }
}

export { CreateOrderService };
