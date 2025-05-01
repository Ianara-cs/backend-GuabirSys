import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsEnum, IsString } from 'class-validator'
import { Role } from 'src/modules/users/entities/user.entity'

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field()
  @IsNotEmpty()
  @IsString()
  username: string

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string

  @Field()
  @IsNotEmpty()
  @IsEnum({ MANAGER: 'MANAGER', CHEF: 'CHEF', ATTENDANT: 'ATTENDANT' })
  role: Role
}
