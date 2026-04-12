const ProgressRepository = require("../repositories/progress.repository");
const ProgressDto = require("../dtos/progress.dto");

class ProgressService {

  static async getAllProgress() {
    const entities = await ProgressRepository.findAll();
    return ProgressDto.toListDto(entities);
  }

  static async getProgressById(progress_id) {
    if (!id) {
      throw new Error("ID is required");
    }

    const entity = await ProgressRepository.findById(progress_id);

    if (!entity) {
      throw new Error("Progress not found");
    }

    return ProgressDto.toResponseDto(entity);
  }

  static async createProgress(body) {
    const { member_id } = body;

    if (!member_id) {
      throw new Error("member_id is required");
    }

    const data = ProgressDto.fromCreateRequest(body);

    const entity = await ProgressRepository.create(data);

    return ProgressDto.toResponseDto(entity);
  }

  static async updateProgress(progress_id, body) {
    if (!progress_id) {
      throw new Error("ID is required");
    }

    const data = ProgressDto.fromUpdateRequest(body);

    const entity = await ProgressRepository.update(progress_id, data);

    if (!entity) {
      throw new Error("Progress not found");
    }

    return ProgressDto.toResponseDto(entity);
  }

  static async deleteProgress(progress_id) {
    if (!progress_id) {
      throw new Error("ID is required");
    }

    const existing = await ProgressRepository.findById(progress_id);

    if (!existing) {
      throw new Error("Progress not found");
    }

    await ProgressRepository.deleteById(progress_id);
  }
}

module.exports = ProgressService;