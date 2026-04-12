const ProgressMapper = require("../mappers/progress.mapper");

module.exports = {
    toResponseDto: ProgressMapper.entityToResponseDto,
    toListDto: ProgressMapper.entitiesToListDto,
    fromCreateRequest: ProgressMapper.createRequestToData,
    fromUpdateRequest: ProgressMapper.updateRequestToData,
};