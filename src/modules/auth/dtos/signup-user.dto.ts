import { ObjectType, OmitType } from '@nestjs/graphql'
import { User } from 'src/modules/users/entities/user.entity'

@ObjectType()
export class SignupUserDTO extends OmitType(
  User,
  ['password', 'username_created', 'username_updated', 'updatedAt'],
  ObjectType,
) {}
