import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
  @ApiProperty({ example: "Иванов Иван Иванович", description: "token" })
  readonly accessToken: string;
}
