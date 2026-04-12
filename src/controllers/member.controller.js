const MemberService = require("../services/member.service");

class MemberController {

  static async getAllMembers(req, res) {
    try {
      const member = await MemberService.getAllMembers();
      res.json(member);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getMemberById(req, res) {
  try {
    const member = await MemberService.getMemberById(req.params.member_id);
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 }

 static async createMember(req, res) {
  try {
    const data = req.body;

    const newMember = await MemberService.createMember(data);

    res.status(201).json(newMember);

  } catch (error) {
    res.status(400).json({ error: error.message });
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

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

static async deleteMember(req, res) {
  try {
    const { member_id } = req.params;

    const result = await MemberService.deleteMember(member_id);

    res.status(200).json(result);

  } catch (error) {
    res.status(404).json({ error: error.message });
  }
 }

}

module.exports = MemberController;