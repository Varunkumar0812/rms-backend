import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateReviewValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    title: schema.string(),
    type: schema.string(),
    rating: schema.number([
      rules.range(1, 5)
    ]),
    pros: schema.string(),
    cons: schema.string(),
    suggestions: schema.string(),
    userId: schema.number([
      rules.exists({ table: "users", column: "id" })
    ])
  })

  public messages: CustomMessages = {
    'title.required': "Title of review need to be specified",
    'type.required': "Type of review need to be specified",
    'rating.required': "Rating of review need to be specified",
    'rating.number': 'Rating must be a number',
    'rating.range': 'Rating value must be between 1 and 5',
    'pros.required': "Pros need to be specified",
    "cons.required": "Cons need to be specified",
    "suggestions.required": "Suggestions need to be specified",
    "userId.number": "userId must be a number",
    "userId.exists": "No user exists with the specifed ID"
  }
}
