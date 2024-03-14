import { Role } from '../entities/user.entity'

export class CreateUserDto {
  name: string
  username: string
  password: string
  role: Role
}
