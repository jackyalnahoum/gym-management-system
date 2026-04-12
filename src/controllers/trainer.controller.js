const TrainerService = require("../services/trainer.service");

class TrainerController {

  static async getAllTrainers(req, res) {
    try {
      const trainers = await TrainerService.getAllTrainers();
      res.json(trainers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getTrainerById(req, res) {
    try {
      const trainer = await TrainerService.getTrainerById(req.params.trainer_id);
      res.json(trainer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createTrainer(req, res) {
    try {
      const trainer = await TrainerService.createTrainer(req.body);
      res.status(201).json(trainer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateTrainer(req, res) {
    try {
      const trainer = await TrainerService.updateTrainer(
        req.params.trainer_id,
        req.body
      );
      res.json(trainer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteTrainer(req, res) {
    try {
      const result = await TrainerService.deleteTrainer(req.params.trainer_id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TrainerController;