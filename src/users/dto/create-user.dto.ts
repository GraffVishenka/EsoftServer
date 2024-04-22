import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "Иванов Иван Иванович", description: "ФИО" })
  @IsString({ message: "Должно быть строкой" })
  readonly fullName: string;

  @ApiProperty({ example: "user@mail.ru", description: "Почта" })
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;
  @ApiProperty({ example: "12345", description: "пароль" })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 16, { message: "Не меньше 4 и не больше 16" })
  readonly password: string;

  @ApiProperty({ example: "Кадры", description: "Отдел Работы" })
  @IsString({ message: "Должно быть строкой" })
  readonly deportament: string;

  @ApiProperty({ example: "Admin", description: "Роль пользователя" })
  @IsString({ message: "Должно быть строкой" })
  readonly role: string;
}
