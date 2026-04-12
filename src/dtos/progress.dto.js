/**
 * Progress DTOs – API contract (camelCase response/request shapes).
 * All entity ↔ DTO conversion is done in the progress mapper.
 */
const ProgressMapper = require("../mappers/progress.mapper");

module.exports = {
    toResponseDto: ProgressMapper.entityToResponseDto,
    toListDto: ProgressMapper.entitiesToListDto,
    fromCreateRequest: ProgressMapper.createRequestToData,
    fromUpdateRequest: ProgressMapper.updateRequestToData,
};