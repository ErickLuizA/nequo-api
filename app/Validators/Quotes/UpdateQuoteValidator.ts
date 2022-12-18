import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UpdateQuoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    content: schema.string(),
    author: schema.string(),
    authorId: schema.number.optional(),
    tags: schema.array.optional().members(schema.number()),
  })

  public messages = {}
}
