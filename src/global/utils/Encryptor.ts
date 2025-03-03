import * as bcrypt from 'bcrypt'

export abstract class Encryptor {
  static async encrypt(password: string): Promise<string> {
    const saltOrRounds = 10
    return await bcrypt.hash(password, saltOrRounds)
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}
