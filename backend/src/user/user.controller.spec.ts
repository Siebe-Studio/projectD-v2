import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  let userController: UserController;
  let userService: UserService;
  let createdUserId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: '1', email: 'test@test.com', name: 'test' }),
            findAll: jest.fn().mockResolvedValue([{ id: '1', email: 'test@test.com', name: 'test' }]),
            findById: jest.fn().mockResolvedValue({ id: '1', email: 'test@test.com', name: 'test' }),
            update: jest.fn().mockResolvedValue({ id: '1', email: 'updated@test.com', name: 'updated', role: 'StockManager' }),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = { email: 'test@test.com', password: 'password', name: 'test' };
    const result = await userController.registerUser(createUserDto);
    expect(result).toEqual({ id: '1', email: 'test@test.com', name: 'test' });
    expect(userService.create).toHaveBeenCalledWith(createUserDto);
    createdUserId = result.id;
  });

  it('should return all users', async () => {
    expect(await userController.findAll()).toEqual([{ id: createdUserId, email: 'test@test.com', name: 'test' }]);
    expect(userService.findAll).toHaveBeenCalled();
  });

  it('should return a user by ID', async () => {
    expect(await userController.getUserProfile(createdUserId)).toEqual({ id: createdUserId, email: 'test@test.com', name: 'test' });
    expect(userService.findById).toHaveBeenCalledWith(createdUserId);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = { email: 'updated@test.com', name: 'updated', role: 'StockManager' };
    expect(await userController.update(createdUserId, updateUserDto)).toEqual({ id: createdUserId, email: 'updated@test.com', name: 'updated', role: 'StockManager' });
    expect(userService.update).toHaveBeenCalledWith(createdUserId, updateUserDto);
  });

  it('should delete a user', async () => {
    expect(await userController.remove(createdUserId)).toEqual({});
    expect(userService.remove).toHaveBeenCalledWith(createdUserId);
  });
});
