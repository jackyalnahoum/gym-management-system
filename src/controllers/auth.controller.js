const AuthService = require("../services/auth.service");

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login(email, password);

      res.json(result);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
}

module.exports = AuthController;