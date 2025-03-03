import { Field, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'
import { SignupUserDTO } from '../dtos/signup-user.dto'

@ObjectType()
export class SignupOutput {
  @Field(() => SignupUserDTO)
  user: SignupUserDTO

  @Field()
  @IsNotEmpty()
  @IsString()
  accessToken: string

  @Field()
  @IsNotEmpty()
  @IsString()
  refreshToken: string
}
