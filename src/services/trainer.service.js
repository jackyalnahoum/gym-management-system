const TrainerRepository = require("../repositories/trainer.repository");
const TrainerDto = require("../dtos/trainer.dto");

class TrainerService {

  static async getAllTrainers() {
    
     const entities = await TrainerRepository.findAll();
     return TrainerDto.toListDto(entities);
  }

  static async getTrainerById(trainer_id) {
    const entity = await TrainerRepository.findById(trainer_id);
        if (!entity) {
            throw new Error("Client not found");
        }
        return TrainerDto.toResponseDto(entity);
  }

  static async createTrainer(body) {
    if (!body.full_name) {
      throw new Error("Full name is required");
    }

    const data = TrainerDto.fromCreateRequest(body);
    const entity = await TrainerRepository.create(data);

    return TrainerDto.toResponseDto(entity);
  }

  static async updateTrainer(trainer_id, body) {
    if (!trainer_id) {
      throw new Error("ID is required");
    }

    const data = TrainerDto.fromUpdateRequest(body);
    const entity = await TrainerRepository.update({
      trainer_id: trainer_id,
      ...data
    });

    if (!entity) {
      throw new Error("Trainer not found");
    }

    return TrainerDto.toResponseDto(entity);
  }

  static async deleteTrainer(trainer_id) {
    if (!trainer_id) {
      throw new Error("ID is required");
    }

    const existing = await TrainerRepository.findById(trainer_id);

    if (!existing) {
      throw new Error("Trainer not found");
    }

    return await TrainerRepository.delete(trainer_id);
  }
}

module.exports = TrainerService;