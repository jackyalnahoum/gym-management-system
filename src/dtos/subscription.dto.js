/**
 * Subscription DTOs – API contract (camelCase response/request shapes).
 * All entity ↔ DTO conversion is done in the subscription mapper.
 */
const SubscriptionMapper = require("../mappers/subscription.mapper");

module.exports = {
    toResponseDto: SubscriptionMapper.entityToResponseDto,
    toListDto: SubscriptionMapper.entitiesToListDto,
    fromCreateRequest: SubscriptionMapper.createRequestToData,
    fromUpdateRequest: SubscriptionMapper.updateRequestToData,
};