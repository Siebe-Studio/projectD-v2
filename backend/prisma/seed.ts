import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.vehicle.createMany({
    data: [
      { location_id: 101, plate: 'AB123CD', description: 'Voertuig 1' },
      { location_id: 102, plate: 'EF456GH', description: 'Voertuig 2' },
      { location_id: 103, plate: 'IJ789KL', description: 'Voertuig 3' },
      { location_id: 104, plate: 'MN012OP', description: 'Voertuig 4' },
      { location_id: 105, plate: 'QR345ST', description: 'Voertuig 5' },
    ],
  });

  console.log('Voertuigen zijn toegevoegd aan de database.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
