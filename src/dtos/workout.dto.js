const WorkoutMapper = require("../mappers/workout.mapper");

module.exports = {
    toResponseDto: WorkoutMapper.entityToResponseDto,
    toListDto: WorkoutMapper.entitiesToListDto,
    fromCreateRequest: WorkoutMapper.createRequestToData,
    fromUpdateRequest: WorkoutMapper.updateRequestToData,
};