import { usersModel } from '@models'
import { users } from '@db/schema'
import { AppError } from '@helpers/apiError'
import { comparePassword, convertPasswordToHash } from '@helpers/password'
import { signToken } from '@helpers/jwt'

type UserInstance = typeof users.$inferInsert

type UserPayload = {
  password: string
} & Omit<UserInstance, 'passwordHash'>

type UserLoginPayload = {
  email: string
  password: string
}

export const registerUser = async ({ password, ...payload }: UserPayload) => {
  const existedUser = await usersModel.findUserByEmail(payload.email)

  if (existedUser) {
    throw new AppError('User with this email already exists', 409)
  }

  const passwordHash = await convertPasswordToHash(password)
  const [userRecord] = await usersModel.create({ ...payload, passwordHash })

  const token = signToken({ userId: userRecord.id })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _, ...user } = userRecord

  return { user, token }
}

export const loginUser = async ({ email, password }: UserLoginPayload) => {
  const userRecord = await usersModel.findUserByEmail(email)

  if (!userRecord) {
    throw new AppError('Invalid email or password', 401)
  }

  const isPwdEqual = await comparePassword(password, userRecord.passwordHash)

  if (!isPwdEqual) {
    throw new AppError('Invalid email or password', 401)
  }

  const token = signToken({ userId: userRecord.id })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _, ...user } = userRecord

  return { user, token }
}
