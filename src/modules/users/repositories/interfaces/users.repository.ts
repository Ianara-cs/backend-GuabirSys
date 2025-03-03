import { CreateUserDto } from '../../dtos/create-user.dto'
import { User } from '../../entities/user.entity'

export interface UsersRepository {
  createUser(createUser: CreateUserDto): Promise<User>
  findUserByUsername(username: string): Promise<User>
}
