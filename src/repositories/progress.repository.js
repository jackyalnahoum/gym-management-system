const pool = require("../db/pool");
const ProgressEntity = require("../entities/progress.entity");

class ProgressRepository {

    static async findAll() {
        const result = await pool.query(
            `SELECT * FROM progress ORDER BY progress_id`
        );
        return ProgressEntity.fromRows(result.rows);
    }

    static async findById(progress_id) {
        const result = await pool.query(
            `SELECT * FROM progress WHERE progress_id = $1`,
            [progress_id]
        );
        return ProgressEntity.fromRow(result.rows[0]);
    }

    static async create({ member_id, weight, notes, recorded_at }) {
        const result = await pool.query(
            `INSERT INTO progress (member_id, weight, notes, recorded_at)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [member_id, weight, notes, recorded_at]
        );

        return ProgressEntity.fromRow(result.rows[0]);
    }

    static async update(progress_id, { member_id, weight, notes, recorded_at }) {
        const result = await pool.query(
            `UPDATE progress
             SET member_id = $1,
                 weight = $2,
                 notes = $3,
                 recorded_at = $4
             WHERE progress_id = $5
             RETURNING *`,
            [member_id, weight, notes, recorded_at, progress_id]
        );

        return ProgressEntity.fromRow(result.rows[0]);
    }

    static async deleteById(progress_id) {
        await pool.query(
            `DELETE FROM progress WHERE progress_id = $1`,
            [progress_id]
        );
    }
}

module.exports = ProgressRepository;