const pool = require("../db/pool");
const TrainerEntity = require("../entities/trainer.entity");

class TrainerRepository {

    static async findAll() {
        const result = await pool.query(
            `SELECT * FROM trainer ORDER BY trainer_id`
        );
        return TrainerEntity.fromRows(result.rows);
    }

    static async findById(trainer_id) {
        const result = await pool.query(
            `SELECT * FROM trainer WHERE trainer_id = $1`,
            [trainer_id]
        );
        return TrainerEntity.fromRow(result.rows[0]);
    }

    static async create({ full_name, specialization, phone, experience }) {
        const result = await pool.query(
            `INSERT INTO trainer (full_name, specialization, phone, experience)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [full_name, specialization, phone, experience]
        );
        return TrainerEntity.fromRow(result.rows[0]);
    }

    static async update(trainer_id, { full_name, specialization, phone, experience }) {
        const result = await pool.query(
            `UPDATE trainer
             SET full_name = $1, specialty = $2, phone = $3, experience = $4
             WHERE trainer_id = $5
             RETURNING *`,
            [full_name, specialization, phone, experience, trainer_id]
        );
        return TrainerEntity.fromRow(result.rows[0]);
    }

    static async delete(trainer_id) {
        await pool.query(
            `DELETE FROM trainer WHERE trainer_id = $1`,
            [trainer_id]
        );
    }
}

module.exports = TrainerRepository;