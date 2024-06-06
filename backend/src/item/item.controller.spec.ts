import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { HistoryService } from 'src/history/history.service';
import { CreateHistoryDto } from 'src/history/dto/create-history.dto';

describe('ItemController', () => {
  let itemController: ItemController;
  let itemService: ItemService;
  let historyService: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: ItemService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: '1', productId: 123, locationId: 456 }),
          },
        },
        {
          provide: HistoryService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    itemController = module.get<ItemController>(ItemController);
    itemService = module.get<ItemService>(ItemService);
    historyService = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(itemController).toBeDefined();
  });

  it('should create a new item and a history record', async () => {
    const createItemDto = { productId: 123, locationId: 456 };
    const userId = 'test-user-id';

    const newItem = await itemController.create(createItemDto, userId);

    expect(newItem).toEqual({ id: '1', productId: 123, locationId: 456 });
    expect(itemService.create).toHaveBeenCalledWith(createItemDto);

    const createHistoryDto: CreateHistoryDto = {
      title: 'CREATED',
      description: `Item with ID 1 was created in 456.`,
      itemId: '1',
      userId: userId,
    };

    expect(historyService.create).toHaveBeenCalledWith(createHistoryDto);
  });
});
