import { Controller, Post, Body, Delete, Param, UseGuards, Get, Request } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UserEntity } from "./entities/user.entity";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary:"Получение всех пользователей из твоего отдела"})
  @ApiResponse({status:200, type:UserEntity})
  @Get("all")
  getAllMyUsers(@Request() req) {
    return this.usersService.getAllMyUsers(req.body.email);
  }

  @ApiOperation({summary:"Создание пользователя"})
  @ApiResponse({status:200, type:UserEntity})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary:"Удаление пользователя"})
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
