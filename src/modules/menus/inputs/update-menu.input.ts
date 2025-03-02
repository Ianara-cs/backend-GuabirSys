import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { Category } from '../entities/menu.entity'

@InputType()
export class UpdateMenuInput {
  @Field()
  @IsNotEmpty()
  id: string

  @Field()
  @IsNotEmpty()
  name: string

  @Field()
  @IsNotEmpty()
  @IsEnum({ KITCHEN: 'KITCHEN', BAR: 'BAR' })
  category: Category
}
