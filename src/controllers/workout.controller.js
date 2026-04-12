const WorkoutService = require("../services/workout.service");
const { handleError } = require("../utils/errorHandler");

class WorkoutController {

  static async getAllWorkouts(req, res) {
    try {
      const workouts = await WorkoutService.getAllWorkouts();
      res.json(workouts);
    } catch (err) {
      return handleError(res, err);
    }
  }

  static async getWorkoutById(req, res) {
    try {
      const workout = await WorkoutService.getWorkoutById(req.params.workout_id);
      res.json(workout);
    } catch (err) {
      return handleError(res, err);
    }
  }

  static async createWorkout(req, res) {
    try {
      const workout = await WorkoutService.createWorkout(req.body);
      res.status(201).json(workout);
    } catch (err) {
      return handleError(res, err);
    }
  }

  static async updateWorkout(req, res) {
    try {
      const workout = await WorkoutService.updateWorkout(
        req.params.workout_id,
        req.body
      );
      res.json(workout);
    } catch (err) {
      return handleError(res, err);
    }
  }

  static async deleteWorkout(req, res) {
    try {
      await WorkoutService.deleteWorkout(req.params.workout_id);
      res.json({ message: "Workout deleted successfully" });
    } catch (err) {
      return handleError(res, err);
    }
  }
}

module.exports = WorkoutController;