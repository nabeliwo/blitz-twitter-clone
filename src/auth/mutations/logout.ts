import { Ctx } from 'blitz'

export default async function logout(_: any, ctx: Ctx) {
  const res = await ctx.session.$revoke()
  return res
}
