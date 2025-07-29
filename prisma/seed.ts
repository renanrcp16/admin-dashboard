import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (for repeatable seed)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();

  // Create Products
  const products = await Promise.all(
    Array.from({ length: 30 }).map(() =>
      prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          price: parseFloat(faker.commerce.price({ min: 0.01, max: 2000 })),
          stock: faker.number.int({ min: 0, max: 300 }),
        },
      })
    )
  );

  const currentYear = new Date().getFullYear();

  // Create Customers with Orders and OrderItems
  for (let i = 0; i < 15; i++) {
    const customer = await prisma.customer.create({
      data: {
        name: faker.person.fullName(),
        document: faker.helpers.replaceSymbols("###-##-####"),
      },
    });

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        date: faker.date.between({
          from: new Date(currentYear, 0, 1),
          to: new Date(currentYear, 11, 31),
        }),
      },
    });

    // Each order has 1–3 items
    const itemsCount = faker.number.int({ min: 1, max: 3 });
    const orderItems = Array.from({ length: itemsCount }).map(() => {
      const product = faker.helpers.arrayElement(products);
      const qty = faker.number.int({ min: 1, max: 5 });
      return {
        orderId: order.id,
        productId: product.id,
        qty,
        price: product.price,
      };
    });

    await prisma.orderItem.createMany({
      data: orderItems,
    });
  }

  console.log("🌱 Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
