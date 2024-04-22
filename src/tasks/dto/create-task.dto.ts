import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString} from "class-validator";

export class CreateTaskDto {
  @ApiProperty({example: 'Решить задачу', description: 'Заголовок'})
  @IsString({ message: "Должно быть строкой" })
  readonly header: string;

  @ApiProperty({example: 'Не работает сервис', description: 'Описание'})
  @IsString({ message: "Должно быть строкой" })
  readonly description: string;
  
  @ApiProperty({example: '2024-05-13', description: 'Дедлайн'})
  @IsDate({ message: "Должно быть датой" })
  readonly deadeline: Date;

  @ApiProperty({example: 'Средний', description: 'Приоритет'})
  @IsString({ message: "Должно быть строкой" })
  readonly priority: string;

  @ApiProperty({example: 'К выполнению', description: 'Статус'})
  @IsString({ message: "Некорректный email" })
  readonly status: string;
  
  @ApiProperty({example: '3', description: 'Создатель'})
  readonly creator: any;

  @ApiProperty({example: '3', description: 'Ответственный'})
  readonly responsible: any;
}

