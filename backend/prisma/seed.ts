import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Add test vehicles
  const vehicle1 = await prisma.vehicle.create({
    data: {
      plate: 'AB-123-CD',
      description: 'Een blauwe auto',
      location_id: 1,  
    },
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      plate: 'EF-456-GH',
      description: 'Een rode vrachtwagen',
      location_id: 2, 
    },
  });

  console.log({ vehicle1, vehicle2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
