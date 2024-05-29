import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    const products = [
      {
        name: 'Product 1',
        description: 'Description of Product 1',
        price: 19.99,
        categoryId: 1,
      },
      {
        name: 'Product 2',
        description: 'Description of Product 2',
        price: 29.99,
        categoryId: 2,
      },
      // Add more product objects as needed
    ];

    await prisma.product.createMany({
      data: products,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();
