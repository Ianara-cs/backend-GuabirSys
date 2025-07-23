import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class DisableUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string

  @Field()
  @IsBoolean()
  active: boolean
}
