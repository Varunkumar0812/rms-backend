import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    email: schema.string([
      rules.email(),
      rules.exists({ table: "users", column: "email" })
    ]),
    password: schema.string()
  })

  public messages: CustomMessages = {
    'email.required': "Email Address is missing",
    'email.email': "Email Address is not in format",
    "email.string": "Email Address must be a string",
    "email.exists": "Email Address is not registered",
    "password.required": "Password is missing",
    "password.string": "Password must be a string"
  }
}
