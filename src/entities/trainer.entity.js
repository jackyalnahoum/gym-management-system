class TrainerEntity {
  constructor(trainer_id, full_name, specialization, phone, experience) {
    this.trainer_id = trainer_id;
    this.full_name = full_name;
    this.specialization = specialization;
    this.phone = phone;
    this.experience = experience;
  }

  static fromRow(row) {
        if (!row) return null;
        return new TrainerEntity(row);
    }

    static fromRows(rows) {
        return (rows || []).map(row => new TrainerEntity(row));
    }
}

module.exports = TrainerEntity;