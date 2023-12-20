import { ApiError } from "../Error/apiError.js";

export function errorHeandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ messege: err.message });
  }

  return res.status(500).json({ messege: "Ошибка 500!" });
}
