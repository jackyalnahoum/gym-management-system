/**
 * Progress entity - represents the progress row from the database.
 * Uses DB column names (snake_case).
 */
class ProgressEntity {
  constructor(progress_id, member_id, weight, notes, recorded_at) {
    this.progress_id = progress_id;
    this.member_id = member_id;
    this.weight = weight;
    this.notes = notes;
    this.recorded_at = recorded_at;
  }

  static fromRow(row) {
    if (!row) return null;
    return new ProgressEntity(row);
  }

  static fromRows(rows) {
    return (rows || []).map(row => new ProgressEntity(row));
  }
}

module.exports = ProgressEntity;