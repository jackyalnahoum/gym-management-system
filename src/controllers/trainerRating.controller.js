const TrainerRatingService = require("../services/trainerRating.service");
const { handleError } = require("../utils/errorHandler"); 

class TrainerRatingController {

  static async getAllRatings(req, res) {
    try {
      const result = await TrainerRatingService.getAllRatings();
      res.json(result);
    } catch (err) {
      return handleError(res, err);
    }
  }

  static async getRatingById(req, res) {
    try {
      const result = await TrainerRatingService.getRatingById(req.params.rating_id);
      res.json(result);
    } catch (err) {
      return handleError(res, err);
    }
  }

  static async createRating(req, res) {
    try {
      const result = await TrainerRatingService.createRating(req.body);
      res.status(201).json(result);
    } catch (err) {
      return handleError(res, err);
    }
  }

  static async deleteRating(req, res) {
    try {
      await TrainerRatingService.deleteRating(req.params.rating_id);
      res.json({ message: "Rating deleted" });
    } catch (err) {
      return handleError(res, err);
    }
  }
}

module.exports = TrainerRatingController;