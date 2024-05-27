import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { PrismaService } from 'src/prisma.service';

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleService, PrismaService],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
