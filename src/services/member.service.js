const MemberRepository = require("../repositories/member.repository");
const MemberDto = require("../dtos/member.dto");

class MemberService {

  static async getAllMembers() {
    const entities = await MemberRepository.findAll();
    return MemberDto.toListDto(entities);
  }

  static async getMemberById(member_id) {
    const entity = await MemberRepository.findById(member_id);
    if (!entity) {
      throw new Error("Member not found");
    }
    return MemberDto.toResponseDto(entity);
  }


 static async createMember(body) {
  if (!body.full_name || !body.email) {
      throw new Error("Name and email are required");
    }
    const data = MemberDto.fromCreateRequest(body);
    const entity = await MemberRepository.create(data);
    return MemberDto.toResponseDto(entity);
  }
 

 static async updateMember(body) {
  const data = MemberDto.fromUpdateRequest(body);
  const updated = await MemberRepository.update({
    member_id: id,
    ...data
  });

    if (!updated) {
      throw new Error("Member not found");
    }
    return MemberDto.toResponseDto(updated);
 }

    
 static async deleteMember(member_id) {
  const existing = await MemberRepository.findById(member_id);

    if (!existing) {
      throw new Error("Member not found");
    }

    return await MemberRepository.delete(member_id);
  }
}



module.exports = MemberService;