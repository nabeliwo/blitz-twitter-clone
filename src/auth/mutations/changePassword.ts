import { SecurePassword } from '@blitzjs/auth'
import { resolver } from '@blitzjs/rpc'
import { AuthenticationError, NotFoundError } from 'blitz'

import { ChangePassword } from '../validations'

import { authenticateUser } from './login'

import db from 'db'

export default resolver.pipe(
  resolver.zod(ChangePassword),
  resolver.authorize(),
  async ({ currentPassword, newPassword }, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId } })
    if (!user) throw new NotFoundError()

    try {
      await authenticateUser(user.email, currentPassword)
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw new Error('Invalid Password')
      }
      throw error
    }

    const hashedPassword = await SecurePassword.hash(newPassword.trim())
    await db.user.update({
      where: { id: user.id },
      data: { hashedPassword },
    })

    return true
  },
)
