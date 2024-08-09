import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource("review", "ReviewsController");
    Route.get("review/user/:id", "ReviewsController.getUserReviews");
}).middleware(["auth"])