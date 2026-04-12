const SubscriptionMapper = require("../mappers/subscription.mapper");

module.exports = {
    toResponseDto: SubscriptionMapper.entityToResponseDto,
    toListDto: SubscriptionMapper.entitiesToListDto,
    fromCreateRequest: SubscriptionMapper.createRequestToData,
    fromUpdateRequest: SubscriptionMapper.updateRequestToData,
};