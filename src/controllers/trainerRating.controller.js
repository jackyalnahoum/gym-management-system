const TrainerRatingService = require("../services/trainerRating.service");

class TrainerRatingController {

  static async getAllRatings(req, res) {
    try {
      const result = await TrainerRatingService.getAllRatings();
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getRatingById(req, res) {
    try {
      const result = await TrainerRatingService.getRatingById(req.params.rating_id);
      res.json(result);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  static async createRating(req, res) {
    try {
      const result = await TrainerRatingService.createRating(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async deleteRating(req, res) {
    try {
      await TrainerRatingService.deleteRating(req.params.rating_id);
      res.json({ message: "Rating deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = TrainerRatingController;