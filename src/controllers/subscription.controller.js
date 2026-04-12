const SubscriptionService = require("../services/subscription.service");

class SubscriptionController {

  static async getAllSubscriptions(req, res) {
    try {
      const subscriptions = await SubscriptionService.getAllSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getSubscriptionById(req, res) {
    try {
      const subscription = await SubscriptionService.getSubscriptionById(req.params.subscription_id);
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createSubscription(req, res) {
    try {
      const subscription = await SubscriptionService.createSubscription(req.body);
      res.status(201).json(subscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateSubscription(req, res) {
    try {
      const subscription = await SubscriptionService.updateSubscription(
        req.params.subscription_id,
        req.body
      );
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteSubscription(req, res) {
    try {
      await SubscriptionService.deleteSubscription(req.params.subscription_id);
      res.json({ message: "Subscription deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SubscriptionController;