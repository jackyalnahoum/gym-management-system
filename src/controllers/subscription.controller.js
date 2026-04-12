const SubscriptionService = require("../services/subscription.service");
const { handleError } = require("../utils/errorHandler");

class SubscriptionController {

  static async getAllSubscriptions(req, res) {
    try {
      const subscriptions = await SubscriptionService.getAllSubscriptions();
      res.json(subscriptions);
    } catch (err) {
        return handleError(res, err);
    }
  }

  static async getSubscriptionById(req, res) {
    try {
      const subscription = await SubscriptionService.getSubscriptionById(req.params.subscription_id);
      res.json(subscription);
    } catch (err) {
        return handleError(res, err);
    }
  }

  static async createSubscription(req, res) {
    try {
      const subscription = await SubscriptionService.createSubscription(req.body);
      res.status(201).json(subscription);
    } catch (err) {
        return handleError(res, err);
    }
  }

  static async updateSubscription(req, res) {
    try {
      const subscription = await SubscriptionService.updateSubscription(
        req.params.subscription_id,
        req.body
      );
      res.json(subscription);
    } catch (err) {
        return handleError(res, err);
    }
  }

  static async deleteSubscription(req, res) {
    try {
      await SubscriptionService.deleteSubscription(req.params.subscription_id);
      res.json({ message: "Subscription deleted successfully" });
    } catch (err) {
        return handleError(res, err);
    }
  }
}

module.exports = SubscriptionController;