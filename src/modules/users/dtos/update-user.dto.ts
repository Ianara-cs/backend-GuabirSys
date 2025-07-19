import { Role } from '../entities/user.entity'

export class UpdateUserDto {
  id: string
  name?: string
  username?: string
  password?: string
  role?: Role
  username_updated?: string
}
