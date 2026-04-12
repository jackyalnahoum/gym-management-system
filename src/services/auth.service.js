
const { generateToken } = require("../utils/token");
const { resolvePermissionsForRoles } = require("../auth/roleManager");

class AuthService {
  static async login(email, password) {
    const user = await MemberRepository.authenticate(email, password);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    
    const roles = ["admin"]; 

    const permissions = resolvePermissionsForRoles(roles);

    const token = generateToken({
      id: user.member_id,
      email: user.email,
      roles,
      permissions
    });

    return { token };
  }
}

module.exports = AuthService;