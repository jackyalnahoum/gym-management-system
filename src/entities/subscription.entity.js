/**
 * Subscription entity - represents the subscription row from the database.
 * Uses DB column names (snake_case).
 */
class SubscriptionEntity {
  constructor(subscription_id, member_id, workout_id, start_date, end_date, status) {
    this.subscription_id = subscription_id;
    this.member_id = member_id;
    this.workout_id = workout_id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.status = status;
  }

  static fromRow(row) {
    if (!row) return null;
    return new SubscriptionEntity(row);
  }

  static fromRows(rows) {
    return (rows || []).map(row => new SubscriptionEntity(row));
  }
}

module.exports = SubscriptionEntity;