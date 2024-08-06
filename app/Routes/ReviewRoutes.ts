import Route from '@ioc:Adonis/Core/Route'

Route.post("/login", "AuthController.login");
Route.post("/register", "AuthController.register");

Route.group(() => {
    Route.get('/review', "ReviewsController.getAllReviews");
    Route.get('/review/:id', "ReviewsController.getReview");
    Route.get("/review/user/:id", "ReviewsController.getUserReviews");
    Route.post('/review', "ReviewsController.createReview");
    Route.patch('/review/:id', "ReviewsController.updateReview");
    Route.delete('/review/:id', "ReviewsController.deleteReview");
}).middleware(["auth"])