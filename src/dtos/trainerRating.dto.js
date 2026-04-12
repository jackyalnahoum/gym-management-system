/**
 * Trainer Rating DTOs – API contract (camelCase response/request shapes).
 * All entity ↔ DTO conversion is done in the trainer rating mapper.
 */
const TrainerRatingMapper = require("../mappers/trainerRating.mapper");

module.exports = {
    toResponseDto: TrainerRatingMapper.entityToResponseDto,
    toListDto: TrainerRatingMapper.entitiesToListDto,
    fromCreateRequest: TrainerRatingMapper.createRequestToData,
    fromUpdateRequest: TrainerRatingMapper.updateRequestToData,
};