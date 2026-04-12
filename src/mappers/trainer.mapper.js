

/**
 * Trainer mapper – handles conversions between TrainerEntity and DTOs.
 */

const TrainerEntity = require("../entities/trainer.entity");

/**
 * Entity → response DTO.
 * @param {TrainerEntity | null} entity
 * @returns {{ id: number, full_name: string, specialization: string } | null}
 */
function entityToResponseDto(entity) {
    if (!entity) return null;
    return {
        id: entity.trainer_id,
        full_name: entity.full_name,
        specialization: entity.specialization,
    };
}

/**
 * Entities → list DTOs.
 * @param {TrainerEntity[]} entities
 * @returns {Array}
 */
function entitiesToListDto(entities) {
    return (entities || []).map(entityToResponseDto);
}

/**
 * Create request → data.
 * @param {{ full_name?: string, specialization?: string }} body
 */
function createRequestToData(body) {
    return {
        full_name: body.full_name,
        specialization: body.specialization,
    };
}

/**
 * Update request → data.
 */
function updateRequestToData(body) {
    return {
        full_name: body.full_name,
        specialization: body.specialization,
    };
}

module.exports = {
    entityToResponseDto,
    entitiesToListDto,
    createRequestToData,
    updateRequestToData,
};