const pool = require("../db/pool");
const TrainerRatingEntity = require("../entities/trainerRating.entity");

class TrainerRatingRepository {

    static async findAll() {
        const result = await pool.query(
            `SELECT * FROM trainer_rating ORDER BY id`
        );
        return TrainerRatingEntity.fromRows(result.rows);
    }

    static async findById(id) {
        const result = await pool.query(
            `SELECT * FROM trainer_rating WHERE id = $1`,
            [id]
        );
        return TrainerRatingEntity.fromRow(result.rows[0]);
    }

    static async create({ member_id, trainer_id, rating, feedback }) {
        const result = await pool.query(
            `INSERT INTO trainer_rating (member_id, trainer_id, rating, feedback)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [member_id, trainer_id, rating, feedback]
        );

        return TrainerRatingEntity.fromRow(result.rows[0]);
    }

    static async update(id, { member_id, trainer_id, rating, feedback }) {
        const result = await pool.query(
            `UPDATE trainer_rating
             SET member_id = $1,
                 trainer_id = $2,
                 rating = $3,
                 feedback = $4
             WHERE id = $5
             RETURNING *`,
            [member_id, trainer_id, rating, feedback, id]
        );

        return TrainerRatingEntity.fromRow(result.rows[0]);
    }

    static async deleteById(id) {
        await pool.query(
            `DELETE FROM trainer_rating WHERE id = $1`,
            [id]
        );
    }
}

module.exports = TrainerRatingRepository;