/**
 * Progress mapper – handles conversions between ProgressEntity and DTOs.
 */

const ProgressEntity = require("../entities/progress.entity");

/**
 * Entity → response DTO (single progress record).
 * @param {ProgressEntity | null} entity
 * @returns {{ id: number, member_id: number, weight: number, notes: string, recorded_at: Date } | null}
 */
function entityToResponseDto(entity) {
    if (!entity) return null;
    return {
        id: entity.progress_id,
        member_id: entity.member_id,
        weight: entity.weight,
        notes: entity.notes,
        recorded_at: entity.recorded_at,
    };
}

/**
 * Entities → list of response DTOs.
 * @param {ProgressEntity[]} entities
 * @returns {{ id: number, member_id: number, weight: number, notes: string, recorded_at: Date }[]}
 */
function entitiesToListDto(entities) {
    return (entities || []).map(entityToResponseDto);
}

/**
 * Request body (create) → plain data for repository.
 * @param {{ member_id?: number, weight?: number, notes?: string, recorded_at?: Date }} body
 * @returns {{ member_id: number, weight: number, notes: string, recorded_at: Date }}
 */
function createRequestToData(body) {
    return {
        member_id: body.member_id,
        weight: body.weight,
        notes: body.notes,
        recorded_at: body.recorded_at,
    };
}

/**
 * Request body (update) → plain data for repository.
 * @param {{ member_id?: number, weight?: number, notes?: string, recorded_at?: Date }} body
 * @returns {{ member_id: number, weight: number, notes: string, recorded_at: Date }}
 */
function updateRequestToData(body) {
    return {
        member_id: body.member_id,
        weight: body.weight,
        notes: body.notes,
        recorded_at: body.recorded_at,
    };
}