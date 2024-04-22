import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({example: 'Решить задачу', description: 'Заголовок'})
  @IsString({ message: "Должно быть строкой" })
  @IsOptional()
  readonly header?: string;

  @ApiProperty({example: 'Не работает сервис', description: 'Описание'})
  @IsString({ message: "Должно быть строкой" })
  @IsOptional()
  readonly description?: string;
  
  @ApiProperty({example: '2024-05-13', description: 'Дедлайн'})
  @IsDate({ message: "Должно быть датой" })
  @IsOptional()
  readonly deadeline?: Date;

  @ApiProperty({example: 'Средний', description: 'Приоритет'})
  @IsString({ message: "Должно быть строкой" })
  @IsOptional()
  readonly priority?: string;

  @ApiProperty({example: 'К выполнению', description: 'Статус'})
  @IsString({ message: "Некорректный email" })
  @IsOptional()
  readonly status?: string;

  @ApiProperty({example: '3', description: 'Ответственный'})
  @IsOptional()
  readonly responsible?: any;
}
