export class User {
  id: string
  name: string
  username: string
  password: string
  role: Role
  isActive: boolean
}

export const Role: {
  MANAGER: 'MANAGER'
  CHEF: 'CHEF'
  ATTENDANT: 'ATTENDANT'
} = {
  MANAGER: 'MANAGER',
  CHEF: 'CHEF',
  ATTENDANT: 'ATTENDANT',
}

export type Role = (typeof Role)[keyof typeof Role]
