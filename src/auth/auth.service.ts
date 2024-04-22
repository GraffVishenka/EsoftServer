import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UserEntity } from "src/users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(dto) {
    const user = await this.validateUser(dto);
    const accessToken = await this.generateToken(user);
    return { user, ...accessToken };
  }

  async signUp(CreateUserDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(
      CreateUserDto.email
    );
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(CreateUserDto.password, 5);
    const user = await this.userService.create({
      ...CreateUserDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: UserEntity) {
    const payload = { user };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: "Некорректный емайл или пароль",
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password
    );
    if (user && passwordEquals) {
      return user;
    }else{
      throw new UnauthorizedException({
        message: "Некорректный емайл или пароль",
      });
    }
  }

  async checkAuth(token) {
    const candidate = await this.jwtService.decode(token);
    if(!candidate){
      throw new UnauthorizedException({
        message: "Пользователь не авторизован",
      });
    }
    const user = await this.userService.getUserByEmail(candidate.user.email)

    return {user}
  }
}
