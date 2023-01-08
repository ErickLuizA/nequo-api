import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class UpdateQuoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    content: schema.string(),
    authorId: schema.number([rules.exists({ table: 'authors', column: 'id' })]),
  })

  public messages = {}
}
