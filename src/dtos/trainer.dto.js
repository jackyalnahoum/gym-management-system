/**
 * Trainer DTOs – API contract (camelCase response/request shapes).
 * All entity ↔ DTO conversion is done in the trainer mapper.
 */ 
const TrainerMapper = require("../mappers/trainer.mapper");

module.exports = {
    toResponseDto: TrainerMapper.entityToResponseDto,
    toListDto: TrainerMapper.entitiesToListDto,
    fromCreateRequest: TrainerMapper.createRequestToData,
    fromUpdateRequest: TrainerMapper.updateRequestToData,
};