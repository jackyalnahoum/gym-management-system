/**
 * Member DTOs – API contract (camelCase response/request shapes).
 * All entity ↔ DTO conversion is done in the member mapper.
*/
const MemberMapper = require("../mappers/member.mapper");

module.exports = {
    toResponseDto: MemberMapper.entityToResponseDto,
    toListDto: MemberMapper.entitiesToListDto,
    fromCreateRequest: MemberMapper.createRequestToData,
    fromUpdateRequest: MemberMapper.updateRequestToData,
};
