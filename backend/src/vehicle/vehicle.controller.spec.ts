import { z } from 'zod';

export const CreateVehicleDto = z.object({
  location_id: z.number().int().positive(),
  plate: z.string().min(1, { message: 'Plate is required' }),
  description: z.string().optional(),
});

export type CreateVehicleDto = z.infer<typeof CreateVehicleDto>;
