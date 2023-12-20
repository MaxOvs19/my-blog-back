import { ApiError } from "../Error/apiError.js";
import { User } from "../models/models.js";

class UserController {
  async registration(req, res, next) {
    const { name, email, password, role } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Некоректные данные пользователя!"));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("Такой пользователь уже есть!"));
    }

    const user = await User.create({ email, name, role, password });

    return res.json({ message: "Create new User!" });
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(ApiError.internal("Такой пользователь ненайден!"));
    }

    if (password != user.password) {
      return next(ApiError.internal("Указан неверный пароль!"));
    }

    return res.json({ auth: true });
  }

  async check(req, res) {}

  async deleteUser(req, res) {}
}

export default new UserController();
