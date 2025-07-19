import { CreateUserDto } from '../../dtos/create-user.dto'
import { UpdateUserDto } from '../../dtos/update-user.dto'
import { User } from '../../entities/user.entity'

export interface UsersRepository {
  createUser(createUser: CreateUserDto): Promise<User>
  findAllUsers(): Promise<User[]>
  findUserByUsername(username: string): Promise<User>
  findUserByUserId(id: string): Promise<User>
  deleteUser(id: string): Promise<User>
  disableUser(id: string, active: boolean): Promise<User>
  updateUser(updateUser: UpdateUserDto): Promise<User>
}
