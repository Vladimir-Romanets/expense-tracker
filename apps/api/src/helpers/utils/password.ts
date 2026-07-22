import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const convertPasswordToHash = (plain: string) => bcrypt.hash(plain, SALT_ROUNDS)

export const comparePassword = (plain: string, hash: string) => bcrypt.compare(plain, hash)
