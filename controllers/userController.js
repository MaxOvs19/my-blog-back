import jwt from "jsonwebtoken";
import { ApiError } from "../Error/apiError.js";
import { User } from "../models/models.js";
import bcrypt from "bcrypt";

const generateJWT = (id, email, role) => {
  return jwt.sign(
    {
      id: id,
      email: email,
      role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};
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

    const hashPassword = bcrypt.hashSync(password, 5);
    const user = await User.create({
      email,
      name,
      role,
      password: hashPassword,
    });

    const jwToken = generateJWT(user.id, user.email, user.role);

    user.save();

    return res.json({ message: "Create new User!", token: jwToken });
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(ApiError.internal("Такой пользователь ненайден!"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль!"));
    }

    const token = generateJWT(user.id, user.email, user.role);

    return res.json({ token: token });
  }

  async check(req, res) {
    const token = generateJWT(req.user.id, req.user.email, req.user.role);
    res.json({ token: token });
  }
}

export default new UserController();
