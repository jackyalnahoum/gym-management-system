/**
 * Trainer Rating entity - represents the trainer rating row from the database.
 * Uses DB column names (snake_case).
 */
class TrainerRatingEntity {
  constructor(id, member_id, trainer_id, rating, feedback) {
    this.id = id;
    this.member_id = member_id;
    this.trainer_id = trainer_id;
    this.rating = rating;
    this.feedback = feedback;
  }

  static fromRow(row) {
    if (!row) return null;
    return new TrainerRatingEntity(row);
  }

  static fromRows(rows) {
    return (rows || []).map(row => new TrainerRatingEntity(row));
  }
}

module.exports = TrainerRatingEntity;