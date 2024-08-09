import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ReviewParamsIdValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    id: schema.number([
      rules.unsigned(),
      rules.exists({ table: "reviews", column: "id" })
    ])
  })

  public messages: CustomMessages = {
    "id.number": "ID must be an number",
    "id.unsigned": "ID must be a positive number",
    "id.exists": "No Review found with the given ID"
  }
}
