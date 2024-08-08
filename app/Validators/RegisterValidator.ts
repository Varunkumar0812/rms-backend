import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    username: schema.string([
      rules.unique({ table: 'users', column: "username" })
    ]),
    email: schema.string([
      rules.email(),
      rules.unique({ table: "users", column: "email" })
    ]),
    password: schema.string([
      rules.regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    ])
  })

  public messages: CustomMessages = {
    'username.required': "Username is missing",
    "username.string": "Username must be a string",
    "username.unique": "Username is already chosen, try a differnet one",
    'email.required': "Email Address is missing",
    'email.email': "Email Address is not in format",
    "email.string": "Email Address must be a string",
    "email.unique": "Email Address is already registered",
    "password.required": "Password is missing",
    "password.string": "Password must be a string",
    "password.regex": "Use atleast one capital letter, a number and a symbol and minimum 8 length for Password "
  }
}
