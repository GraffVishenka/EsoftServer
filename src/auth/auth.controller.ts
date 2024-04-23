import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { UserEntity } from "src/users/entities/user.entity";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary:"Авторизация"})
  @ApiResponse({status:200, type:UserEntity})
  @UseGuards(LocalAuthGuard)
  @Post("/sign-in")
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @ApiOperation({summary:"Регистрация"})
  @ApiResponse({status:200, type:UserEntity})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("/sign-up")
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }

  @ApiOperation({summary:"Проверка авторизации"})
  @ApiResponse({status:200, type:UserEntity})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/check")
  checkAuth(@Request() req){
    return req.user
  }
}
