import { usersModel } from '@models'
import { users } from '@db/schema'
import { AppError } from '@helpers/errors/apiError'
import { comparePassword, convertPasswordToHash } from '@helpers/utils/password'
import { signToken } from '@helpers/utils/jwt'

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
    const error = new AppError('Email already in use', 409, { email: 'Email already in use' })
    throw error
  }

  const passwordHash = await convertPasswordToHash(password)
  const [userRecord] = await usersModel.create({ ...payload, passwordHash })

  const token = signToken({ userId: userRecord.id })

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

  const { passwordHash: _, ...user } = userRecord

  return { user, token }
}
