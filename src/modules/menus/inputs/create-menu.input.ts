import { Field, InputType } from '@nestjs/graphql'
import { Category } from '../entities/menu.entity'
import { IsNotEmpty, IsEnum, IsString } from 'class-validator'

@InputType()
export class CreateMenuInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field()
  @IsNotEmpty()
  @IsEnum({ KITCHEN: 'KITCHEN', BAR: 'BAR' })
  category: Category
}
