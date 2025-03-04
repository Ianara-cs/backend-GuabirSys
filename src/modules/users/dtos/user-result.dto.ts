import { ObjectType, OmitType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'

@ObjectType()
export class UserResultDto extends OmitType(
  User,
  ['password', 'username_created', 'username_updated', 'updatedAt'],
  ObjectType,
) {}
