/**
 * Subscription mapper – handles conversions between SubscriptionEntity and DTOs.
 */

const SubscriptionEntity = require("../entities/subscription.entity");

function entityToResponseDto(entity) {
    if (!entity) return null;
    return {
        id: entity.subscription_id,
        member_id: entity.member_id,
        workout_id: entity.workout_id,
        start_date: entity.start_date,
        end_date: entity.end_date,
        status: entity.status,
    };
}

function entitiesToListDto(entities) {
    return (entities || []).map(entityToResponseDto);
}

function createRequestToData(body) {
    return {
        member_id: body.member_id,
        workout_id: body.workout_id,
        start_date: body.start_date,
        end_date: body.end_date,
        status: body.status,
    };
}

function updateRequestToData(body) {
    return {
        member_id: body.member_id,
        workout_id: body.workout_id,
        start_date: body.start_date,
        end_date: body.end_date,
        status: body.status,
    };
}

module.exports = {
    entityToResponseDto,
    entitiesToListDto,
    createRequestToData,
    updateRequestToData,
};