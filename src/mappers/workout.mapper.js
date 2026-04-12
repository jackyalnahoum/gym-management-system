const WorkoutEntity = require("../entities/workout.entity")

/**
 * Entity → response DTO (single client).
 * @param {WorkoutEntity | null} entity
 * @returns {{ workout__id: number, full_name: string, email: string } | null}
 */

function entityToResponseDto(entity) {
    if (!entity) return null;

    return {
        workout_id: entity.workout_id,
        title: entity.title,
        description: entity.description,
        trainer_id: entity.trainer_id,
    };
}

function entitiesToListDto(entities) {
    return (entities || []).map(entityToResponseDto);
}

function createRequestToData(body) {
    return {
        title: body.title,
        description: body.description,
        trainer_id: body.trainer_id,
    };
}

function updateRequestToData(body) {
    return {
        title: body.title,
        description: body.description,
        trainer_id: body.trainer_id,
    };
}

module.exports = {
    entityToResponseDto,
    entitiesToListDto,
    createRequestToData,
    updateRequestToData,
};