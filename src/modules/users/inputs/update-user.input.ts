import { Field, InputType } from '@nestjs/graphql'
import { Role } from '../entities/user.entity'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  id: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  @IsString()
  password?: string

  @Field({ nullable: true })
  @IsEnum({ MANAGER: 'MANAGER', CHEF: 'CHEF', ATTENDANT: 'ATTENDANT' })
  role?: Role
}
