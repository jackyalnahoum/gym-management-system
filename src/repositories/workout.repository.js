const pool = require("../db/pool");
const WorkoutEntity = require("../entities/workout.entity");

class WorkoutRepository {

    static async findAll() {
        const result = await pool.query(
            `SELECT * FROM workout_plan ORDER BY workout_id`
        );
        return WorkoutEntity.fromRows(result.rows);
    }

    static async findById(subscription_id) {
        const result = await pool.query(
            `SELECT * FROM workout_plan WHERE workout_id = $1`,
            [subscription_id]
        );
        return WorkoutEntity.fromRow(result.rows[0]);
    }

    static async create({ title, description, trainer_id }) {
        const result = await pool.query(
            `INSERT INTO workout_plan (title, description, trainer_id)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [title, description, trainer_id]
        );

        return WorkoutEntity.fromRow(result.rows[0]);
    }

    static async update(subscription_id, { title, description, trainer_id }) {
        const result = await pool.query(
            `UPDATE workout_plan
             SET title = $1,
                 description = $2,
                 trainer_id = $3
             WHERE workout_id = $4
             RETURNING *`,
            [title, description, trainer_id, subscription_id]
        );

        return WorkoutEntity.fromRow(result.rows[0]);
    }

    static async deleteById(subscription_id) {
        await pool.query(
            `DELETE FROM workout_plan WHERE workout_id = $1`,
            [subscription_id]
        );
    }
}

module.exports = WorkoutRepository;