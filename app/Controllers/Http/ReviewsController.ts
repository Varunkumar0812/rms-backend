import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ValidationException } from '@ioc:Adonis/Core/Validator'
import Review from 'App/Models/Review'
import CreateReviewValidator from 'App/Validators/CreateReviewValidator';
import GetReviewValidator from 'App/Validators/GetReviewValidator';
import UpdateReviewValidator from 'App/Validators/UpdateReviewValidator';
import ReviewParamsIdValidator from 'App/Validators/ReviewParamsIdValidator';
import UserParamsIdValidator from 'App/Validators/UserParamsIdValidator';

export default class ReviewsController {

    // Get all reviews - Includes Filter, Sort and Pagination
    public async index({ request, response }: HttpContextContract) {
        try {
            const payload = await request.validate(GetReviewValidator);
            const { rating, type, sortBy, sortOrder, page, limit } = payload;

            const query = Review.query()
                .if(rating, (query) => query.where("rating", rating))
                .if(type, (query) => query.where("type", type))
                .if(sortBy, (query) => query.orderBy(sortBy, sortOrder || 'asc'))
                .preload('user')
                .paginate(page || 1, limit || 2);

            return await query;
        }
        catch (err) {
            response.status(err instanceof ValidationException ? 400 : 500);
            console.log(err);

            return err?.messages?.errors;
        }
    }

    // Get a single review
    public async show({ request, response, params }: HttpContextContract) {
        try {
            const ParamsValidator = new ReviewParamsIdValidator({});
            const { id } = await request.validate({
                schema: ParamsValidator.schema,
                data: params,
                messages: ParamsValidator.messages,
            })
            return await Review.findOrFail(id);
        }
        catch (err) {
            response.status(err instanceof ValidationException ? 400 : 500);
            return err?.messages?.errors;
        }
    }

    // Create a review
    public async store({ request, response }: HttpContextContract) {
        try {
            const payload = await request.validate(CreateReviewValidator);
            return await Review.createMany([payload]);
        }
        catch (err) {
            response.status(err instanceof ValidationException ? 400 : 500);
            return err?.messages?.errors;
        }
    }

    // Update a review
    public async update({ request, response, params }: HttpContextContract) {
        try {
            const ParamsValidator = new ReviewParamsIdValidator({});
            const { id } = await request.validate({
                schema: ParamsValidator.schema,
                data: params,
                messages: ParamsValidator.messages,
            })
            const payload = await request.validate(UpdateReviewValidator);

            const review = (await Review.findOrFail(id)).merge(payload).save();
            return review;
        }
        catch (err) {
            response.status(err instanceof ValidationException ? 400 : 500);
            return err?.messages?.errors;
        }
    }

    // Delete a review
    public async destroy({ request, response, params }: HttpContextContract) {
        try {
            const ParamsValidator = new ReviewParamsIdValidator({});
            const { id } = await request.validate({
                schema: ParamsValidator.schema,
                data: params,
                messages: ParamsValidator.messages,
            })

            const review = await Review.findOrFail(id);
            review.delete();
            return review;
        }
        catch (err) {
            response.status(err instanceof ValidationException ? 400 : 500);
            return err?.messages?.errors;
        }
    }

    // Get the reviews of a specifc user
    public async getUserReviews({ request, response, params }: HttpContextContract) {
        try {
            const ParamsValidator = new UserParamsIdValidator({});
            const { id } = await request.validate({
                schema: ParamsValidator.schema,
                data: params,
                messages: ParamsValidator.messages
            })

            return await Review.query().where("user_id", id).preload('user');
        }
        catch (err) {
            response.status(err instanceof ValidationException ? 400 : 500);
            return err?.messages?.errors;
        }
    }
}
