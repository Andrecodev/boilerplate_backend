import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  isActive?: boolean = true;
}
