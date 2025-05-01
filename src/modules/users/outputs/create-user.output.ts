import { ObjectType, OmitType } from '@nestjs/graphql'
import { User } from 'src/modules/users/entities/user.entity'

@ObjectType()
export class CreateUserOutput extends OmitType(
  User,
  ['password'],
  ObjectType,
) {}
