const MemberEntity = require("../entities/member.entity")

function entityToResponseDto(entity) {
    if (!entity) return null;

    return {
        member_id: entity.member_id,
        full_name: entity.full_name,
        email: entity.email,
        phone: entity.phone,
        age: entity.age,
    };
}

function entitiesToListDto(entities) {
    return (entities || []).map(entityToResponseDto);
}

function createRequestToData(body) {
    return {
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        age: body.age,
    };
}

function updateRequestToData(body) {
    return {
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        age: body.age,
    };
}

module.exports = {
    entityToResponseDto,
    entitiesToListDto,
    createRequestToData,
    updateRequestToData,
};