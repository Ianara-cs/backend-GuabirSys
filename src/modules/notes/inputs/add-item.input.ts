import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class AddItemNoteInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  noteId: string

  @Field()
  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @Field()
  @IsNotEmpty()
  @IsString()
  itemId: string
}
