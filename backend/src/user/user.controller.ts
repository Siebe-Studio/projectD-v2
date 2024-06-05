import { Controller, Get, Param, UseGuards, Delete, Patch, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(":id")
    async getUserProfile(@Param('id') id: string) {
        return await this.userService.findById(id);
    }

    @Post('create')
    async registerUser(@Body() dto: CreateUserDto) {
        return await this.userService.create(dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
    
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto);
    }
}
