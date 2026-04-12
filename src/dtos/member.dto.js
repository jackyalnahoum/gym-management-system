const MemberMapper = require("../mappers/member.mapper");

module.exports = {
    toResponseDto: MemberMapper.entityToResponseDto,
    toListDto: MemberMapper.entitiesToListDto,
    fromCreateRequest: MemberMapper.createRequestToData,
    fromUpdateRequest: MemberMapper.updateRequestToData,
};
