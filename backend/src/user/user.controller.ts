import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Roles('ADMIN')
    @UseGuards(JwtGuard)
    @Get(":id")
    async getUserProfile(@Param('id') id: string) {
        return await this.userService.findById(id);
    }
}
