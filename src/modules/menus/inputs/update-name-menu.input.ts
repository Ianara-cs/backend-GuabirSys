import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateMenuNameInput {
  @Field()
  @IsNotEmpty()
  id: string

  @Field()
  @IsNotEmpty()
  name: string
}
