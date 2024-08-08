import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Review from 'App/Models/Review'
import CreateReviewValidator from 'App/Validators/CreateReviewValidator';
import UpdateReviewValidator from 'App/Validators/UpdateReviewValidator';

export default class ReviewsController {

    // Get all reviews - Includes Filter, Sort and Pagination
    public async index({ request, response }: HttpContextContract) {
        try {
            const { rating, type, sortBy, sortOrder, page, limit } = request.qs();
            const query = Review.query().preload('user');

            if (rating) query.where("rating", rating);
            if (type) query.where('type', type);
            if ((sortBy && Review.$hasColumn(sortBy))) query.orderBy(sortBy, sortOrder || 'ASC');
            if (page && limit) query.paginate(page, limit)

            return await query;
        }
        catch (err) {
            response.status(500);
            return err?.messages?.err;
        }
    }

    // Get a single review
    public async show({ response, params }: HttpContextContract) {
        try {
            return await Review.findOrFail(params.id);
        }
        catch (err) {
            response.status(500);
            return err?.messages?.err;
        }
    }

    // Create a review
    public async store({ request, response }: HttpContextContract) {
        try {
            const payload = await request.validate(CreateReviewValidator);
            return await Review.createMany([payload]);
        }
        catch (err) {
            response.status(500);
            return err?.messages?.errors;
        }
    }

    // Update a review
    public async update({ request, response, params }: HttpContextContract) {
        try {
            const payload = await request.validate(UpdateReviewValidator);
            const review = (await Review.findOrFail(params.id)).merge(payload).save();
            return review;
        }
        catch (err) {
            response.status(500);
            return err?.messages?.err;
        }
    }

    // Delete a review
    public async destroy({ response, params }: HttpContextContract) {
        try {
            const review = await Review.findOrFail(params.id);
            review.delete();
            return review;
        }
        catch (err) {
            response.status(500);
            return err?.message?.err;
        }
    }

    // Get the reviews of a specifc user
    public async getUserReviews({ response, params }: HttpContextContract) {
        try {
            return await Review.query().where("user_id", params.id).preload('user');
        }
        catch (err) {
            response.status(500);
            return err.messages.err;
        }
    }
}
