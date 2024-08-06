import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {
    public async login({ auth, request, response }: HttpContextContract) {
        try {
            const email = request.input("email");
            const password = request.input("password");

            const token = await auth.use("api").attempt(email, password);

            const user: any = await User.findBy('email', email);
            return { token: token.token, username: user.username, user_id: user.id };
        }
        catch (err) {
            response.status(500);
            return err;
        }
    }

    public async register({ auth, request, response }: HttpContextContract) {
        try {
            const data = request.body();

            const user = await User.create(data);
            console.log(user);

            const token = await auth.login(user);

            return { token: token.token, user_id: user.id };
        }
        catch (err) {
            response.status(500);
            return err;
        }
    }
}