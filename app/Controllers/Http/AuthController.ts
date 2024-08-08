import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import LoginValidator from 'App/Validators/LoginValidator';
import RegisterValidator from 'App/Validators/RegisterValidator';

export default class AuthController {
    public async login({ auth, request, response }: HttpContextContract) {
        try {
            const { email, password } = await request.validate(LoginValidator);
            const { token } = await auth.use("api").attempt(email, password);

            const { username, id }: any = await User.findBy('email', email);
            return { token, username, user_id: id };
        }
        catch (err) {
            response.status(500);
            return err.messages?.errors;
        }
    }

    public async register({ auth, request, response }: HttpContextContract) {
        try {
            const payload = await request.validate(RegisterValidator);
            const user = await User.create(payload);

            const { token } = await auth.login(user);
            return { token, username: user.username, user_id: user.id };
        }
        catch (err) {
            response.status(500);
            return err.messages?.errors;
        }
    }

    public async logout({ auth, response }: HttpContextContract) {
        try {
            await auth.use("api").logout();
            response.json({ message: "Logged Out sucessfully!" });
        }
        catch (err) {
            response.status(500);
            return err;
        }
    }
}