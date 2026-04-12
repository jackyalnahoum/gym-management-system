const MemberService = require("../services/member.service");
const { handleError } = require("../utils/errorHandler");

class MemberController {

  static async getAllMembers(req, res) {
    try {
      const member = await MemberService.getAllMembers();
      res.json(member);
    } catch (err) {
        return handleError(res, err);
      }
  }

  static async getMemberById(req, res) {
  try {
    const member = await MemberService.getMemberById(req.params.member_id);
    res.json(member);
  } catch (err) {
     return handleError(res, err);
  }
 }

 static async createMember(req, res) {
  try {
    const data = req.body;
    const newMember = await MemberService.createMember(data);
    res.status(201).json(newMember);
  } catch (err) {
    return handleError(res, err);
    }
 }

 static async updateMember(req, res) {
  try {
    const { member_id } = req.params;
    const data = req.body;

    const updatedMember = await MemberService.updateMember({
      member_id,
      ...data
    });
    res.status(200).json(updatedMember);
  } catch (err) {
      return handleError(res, err);
   }
}

static async deleteMember(req, res) {
        try {
            const result = await MemberService.deleteMember(req.params.member_id);
            res.json(result);
        } catch (err) {
            return handleError(res, err);
        }
    }
}



module.exports = MemberController;