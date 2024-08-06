import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Review from 'App/Models/Review'
import User from 'App/Models/User';

export default class ReviewsController {
    public async getAllReviews({ response }: HttpContextContract) {
        try {
            const reviews = await Review.all();

            const new_reviews = await Promise.all(reviews.map(async (ele) => {
                const review: any = {};
                const user = await User.findOrFail(ele.user_id);

                review.title = ele.title;
                review.type = ele.type;
                review.rating = ele.rating;
                review.pros = ele.pros;
                review.cons = ele.cons;
                review.suggestions = ele.suggestions;
                review.username = user.username;
                review.user_id = ele.user_id;

                return review;
            }));

            console.log(new_reviews);

            return new_reviews;
        }
        catch (err) {
            response.status(500);
            return err;
        }
    }

    public async getReview({ request, response }: HttpContextContract) {
        try {
            const review = await Review.findOrFail(request.params().id);
            return review;
        }
        catch (err) {
            response.status(500);
            return err;
        }
    }

    public async getUserReviews({ request, response }: HttpContextContract) {
        try {
            const reviews = await Review.query().where("user_id", request.params().id);
            return reviews;
        }
        catch (err) {
            response.status(500);
            return err;
        }
    }

    public async createReview({ request, response }: HttpContextContract) {
        try {
            const data = request.body();
            console.log(data);

            const review = await Review.createMany([data]);
            return review;
        }
        catch (err) {
            response.status(500);
            return err;
        }
    }

    public async updateReview({ request, response }: HttpContextContract) {
        try {
            const data = request.body();

            const review = (await Review.findOrFail(request.params().id)).merge(data).save();
            return review;
        }
        catch (err) {
            response.status(500);
            return err;
        }
    }

    public async deleteReview({ request, response }: HttpContextContract) {
        try {
            const review = await Review.findOrFail(request.params().id);
            review.delete();
            return review;
        }
        catch (err) {
            response.status(500);
            return err;
        }
    }
}
