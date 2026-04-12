const TrainerMapper = require("../mappers/trainer.mapper");

module.exports = {
    toResponseDto: TrainerMapper.entityToResponseDto,
    toListDto: TrainerMapper.entitiesToListDto,
    fromCreateRequest: TrainerMapper.createRequestToData,
    fromUpdateRequest: TrainerMapper.updateRequestToData,
};