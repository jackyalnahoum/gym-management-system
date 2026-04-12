/**
 * Workout DTOs – API contract (camelCase response/request shapes).
 * All entity ↔ DTO conversion is done in the workout mapper.
 */
const WorkoutMapper = require("../mappers/workout.mapper");

module.exports = {
    toResponseDto: WorkoutMapper.entityToResponseDto,
    toListDto: WorkoutMapper.entitiesToListDto,
    fromCreateRequest: WorkoutMapper.createRequestToData,
    fromUpdateRequest: WorkoutMapper.updateRequestToData,
};