import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}


  // login user and return tokens
  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    const payload = {
      email: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
        user,
        backendTokens: {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: '1h',
                secret: process.env.jwtSecretKey,
            }),
            refreshToken: this.jwtService.sign(payload, {
                expiresIn: '7d',
                secret: process.env.jwtRefreshTokenKey,
            })
        }
    }
  }


  // Checks if user exists and password is correct
  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async refreshToken(user: any){
    const payload = {
        email: user.email,
        sub: user.sub,
    };

    return {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: '1h',
                secret: process.env.jwtSecretKey,
            }),
            refreshToken: this.jwtService.sign(payload, {
                expiresIn: '7d',
                secret: process.env.jwtRefreshTokenKey,
            })
        }
  }
}
