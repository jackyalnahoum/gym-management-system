const TrainerRatingMapper = require("../mappers/trainerRating.mapper");

module.exports = {
    toResponseDto: TrainerRatingMapper.entityToResponseDto,
    toListDto: TrainerRatingMapper.entitiesToListDto,
    fromCreateRequest: TrainerRatingMapper.createRequestToData,
    fromUpdateRequest: TrainerRatingMapper.updateRequestToData,
};