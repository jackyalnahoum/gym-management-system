const TrainerRatingRepository = require("../repositories/trainerRating.repository");

class TrainerRatingService {

 static async createRating(body) {
    const { member_id, trainer_id, rating, feedback } = body;

    if (!member_id || !trainer_id || !rating) {
      throw new Error("member_id, trainer_id and rating are required");
    }

    return await TrainerRatingRepository.create({
      member_id,
      trainer_id,
      rating,
      feedback,
    });
   }

  static async getAllRatings() {
    return await TrainerRatingRepository.findAll();
  }

  static async getRatingById(id) {
    if (!id) {
      throw new Error("ID is required");
    }

    const rating = await TrainerRatingRepository.findById(id);

    if (!rating) {
      throw new Error("Rating not found");
    }

    return rating;
  }

  static async deleteRating(id) {
    if (!id) {
      throw new Error("ID is required");
    }

    const existing = await TrainerRatingRepository.findById(id);

    if (!existing) {
      throw new Error("Rating not found");
    }

    await TrainerRatingRepository.delete(id);
  }
}

module.exports = TrainerRatingService;