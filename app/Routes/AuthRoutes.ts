import Route from '@ioc:Adonis/Core/Route'

Route.post("/login", "AuthController.login");
Route.post("/register", "AuthController.register");
Route.post("/logout", "AuthController.logout");