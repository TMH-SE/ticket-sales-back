import * as bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

export const isPasswordMatched = async (
  rawPassword: string,
  encodedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(rawPassword, encodedPassword)
}
