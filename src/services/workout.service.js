const WorkoutRepository = require("../repositories/workout.repository");
const WorkoutDto = require("../dtos/workout.dto");

class WorkoutService {

  static async getAllWorkouts() {
    const entities = await WorkoutRepository.findAll();
    return WorkoutDto.toListDto(entities);
  }

  static async getWorkoutById(workout_id) {
    if (!workout_id) {
      throw new Error("ID is required");
    }

    const entity = await WorkoutRepository.findById(workout_id);

    if (!entity) {
      throw new Error("Workout not found");
    }

    return WorkoutDto.toResponseDto(entity);
  }

  static async createWorkout(body) {
    const { title, trainer_id } = body;

    if (!title || !trainer_id) {
      throw new Error("title and trainer_id are required");
    }

    const data = WorkoutDto.fromCreateRequest(body);

    const entity = await WorkoutRepository.create(data);

    return WorkoutDto.toResponseDto(entity);
  }

  static async updateWorkout(trainer_id, body) {
    if (!trainer_id) {
      throw new Error("ID is required");
    }

    const data = WorkoutDto.fromUpdateRequest(body);

    const entity = await WorkoutRepository.update(trainer_id, data);

    if (!entity) {
      throw new Error("Workout not found");
    }

    return WorkoutDto.toResponseDto(entity);
  }

  static async deleteWorkout(trainer_id) {
    if (!trainer_id) {
      throw new Error("ID is required");
    }

    const existing = await WorkoutRepository.findById(trainer_id);

    if (!existing) {
      throw new Error("Workout not found");
    }

    await WorkoutRepository.deleteById(trainer_id);
  }
}

module.exports = WorkoutService;