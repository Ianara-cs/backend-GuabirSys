import { Field, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@ObjectType()
export class SigninOutput {
  @Field()
  @IsNotEmpty()
  @IsString()
  accessToken: string

  @Field()
  @IsNotEmpty()
  @IsString()
  refreshToken: string
}
