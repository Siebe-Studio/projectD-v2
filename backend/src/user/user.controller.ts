import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/roles.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(":id")
    @Roles('ADMIN')
    @UseGuards(JwtGuard)
    async getUserProfile(@Param('id') id: string) {
        return await this.userService.findById(id);
    }
}
