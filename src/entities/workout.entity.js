/**
 * Workout entity - represents the workout row from the database.
 * Uses DB column names (snake_case).
 */
class WorkoutEntity {
  constructor(workout_id, title, description, trainer_id) {
    this.workout_id = workout_id;
    this.title = title;
    this.description = description;
    this.trainer_id = trainer_id;
  }

  static fromRow(row) {
    if (!row) return null;
    return new WorkoutEntity(row);
  }

  static fromRows(rows) {
    return (rows || []).map(row => new WorkoutEntity(row));
  }
}

module.exports = WorkoutEntity;