const AuthService = require("../services/auth.service");
const { handleError } = require("../utils/errorHandler");

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login(email, password);

      res.json(result);
    } catch (err) {
       return handleError(res, err);
    }
  }
}

module.exports = AuthController;