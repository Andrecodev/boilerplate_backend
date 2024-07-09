import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

type category = 'Desayunos';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: category;

  @IsString()
  @IsNotEmpty()
  description: string;

  // @IsNumber()
  @IsNotEmpty()
  price: string | number;

  // @IsArray()
  // @IsNotEmpty()
  // images: Array<string>;
}
