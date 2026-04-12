const pool = require("../db/pool");
const SubscriptionEntity = require("../entities/subscription.entity");

class SubscriptionRepository {

    static async findAll() {
        const result = await pool.query(
            `SELECT * FROM subscription ORDER BY subscription_id`
        );
        return SubscriptionEntity.fromRows(result.rows);
    }

    static async findById(subscription_id) {
        const result = await pool.query(
            `SELECT * FROM subscription WHERE subscription_id = $1`,
            [subscription_id]
        );
        return SubscriptionEntity.fromRow(result.rows[0]);
    }

    static async create({ member_id, workout_id, start_date, end_date, status }) {
        const result = await pool.query(
            `INSERT INTO subscription (member_id, workout_id, start_date, end_date, status)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [member_id, workout_id, start_date, end_date, status]
        );

        return SubscriptionEntity.fromRow(result.rows[0]);
    }

    static async update(subscription_id, { member_id, workout_id, start_date, end_date, status }) {
        const result = await pool.query(
            `UPDATE subscription
             SET member_id = $1,
                 workout_id = $2,
                 start_date = $3,
                 end_date = $4,
                 status = $5
             WHERE subscription_id = $6
             RETURNING *`,
            [member_id, workout_id, start_date, end_date, status, subscription_id]
        );

        return SubscriptionEntity.fromRow(result.rows[0]);
    }

    static async deleteById(subscription_id) {
        await pool.query(
            `DELETE FROM subscription WHERE subscription_id = $1`,
            [subscription_id]
        );
    }
}

module.exports = SubscriptionRepository;