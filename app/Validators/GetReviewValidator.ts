import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetReviewValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    rating: schema.enum.optional([1, 2, 3, 4, 5]),
    type: schema.enum.optional(['University Review', 'Food Review', 'Hotel Review', 'Product Review', 'Travel Review']),
    sortBy: schema.enum.optional(['title', 'type', 'rating']),
    sortOrder: schema.enum.optional(["asc", "desc"]),
    page: schema.number.optional(),
    limit: schema.number.optional()
  })

  public messages: CustomMessages = {
    'rating.enum': "Rating must take values of [1, 2, 3, 4, 5]",
    'type.enum': "Type must take values of ['University Review', 'Food Review', 'Hotel Review', 'Product Review', 'Travel Review']",
    'sortBy.enum': "Sorting attribute must take values of ['title', 'type', 'rating']",
    'sortOrder.enum': "Sorting order must take values of ['asc', 'desc']",
    'page.number': "Number of pages must be a number",
    'limit.number': "Number of records per page must be a number"
  }
}
