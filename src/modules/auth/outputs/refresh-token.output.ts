import { Field, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@ObjectType()
export class RefreshTokenOutput {
  @Field()
  @IsNotEmpty()
  @IsString()
  accessToken: string
}
