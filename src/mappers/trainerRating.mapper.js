/**
 * TrainerRating mapper – handles conversions between TrainerRatingEntity and DTOs.
 */

const TrainerRatingEntity = require("../entities/trainerRating.entity");

/**
 * Entity → response DTO (single rating).
 * @param {TrainerRatingEntity | null} entity
 * @returns {{ id: number, member_id: number, trainer_id: number, rating: number, feedback: string } | null}
 */
function entityToResponseDto(entity) {
    if (!entity) return null;
    return {
        id: entity.rating_id,
        member_id: entity.member_id,
        trainer_id: entity.trainer_id,
        rating: entity.rating,
        feedback: entity.feedback,
    };
}

/**
 * Entities → list of response DTOs.
 * @param {TrainerRatingEntity[]} entities
 * @returns {{ id: number, member_id: number, trainer_id: number, rating: number, feedback: string }[]}
 */
function entitiesToListDto(entities) {
    return (entities || []).map(entityToResponseDto);
}

/**
 * Request body (create) → plain data for repository.
 * @param {{ member_id?: number, trainer_id?: number, rating?: number, feedback?: string }} body
 * @returns {{ member_id: number, trainer_id: number, rating: number, feedback: string }}
 */
function createRequestToData(body) {
    return {
        member_id: body.member_id,
        trainer_id: body.trainer_id,
        rating: body.rating,
        feedback: body.feedback,
    };
}

/**
 * Request body (update) → plain data for repository.
 * @param {{ member_id?: number, trainer_id?: number, rating?: number, feedback?: string }} body
 * @returns {{ member_id: number, trainer_id: number, rating: number, feedback: string }}
 */
function updateRequestToData(body) {
    return {
        member_id: body.member_id,
        trainer_id: body.trainer_id,
        rating: body.rating,
        feedback: body.feedback,
    };
}

module.exports = {
    entityToResponseDto,
    entitiesToListDto,
    createRequestToData,
    updateRequestToData,
};