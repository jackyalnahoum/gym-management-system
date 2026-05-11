/**
 * Workout entity - represents the workout row from the database.
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

    return new WorkoutEntity(
      row.workout_id,
      row.title,
      row.description,
      row.trainer_id
    );
  }

  static fromRows(rows) {

    return (rows || []).map(
      row => WorkoutEntity.fromRow(row)
    );
  }
}

module.exports = WorkoutEntity;