const SubscriptionRepository = require("../repositories/subscription.repository");
const SubscriptionDto = require("../dtos/subscription.dto");

class SubscriptionService {

  static async getAllSubscriptions() {
    const entities = await SubscriptionRepository.findAll();
    return SubscriptionDto.toListDto(entities);
  }

  static async getSubscriptionById(subscription_id) {
    if (!subscription_id) {
      throw new Error("ID is required");
    }

    const entity = await SubscriptionRepository.findById(subscription_id);

    if (!entity) {
      throw new Error("Subscription not found");
    }

    return SubscriptionDto.toResponseDto(entity);
  }

  static async createSubscription(body) {
    const { member_id, workout_id, start_date, end_date, status } = body;

    if (!member_id || !workout_id) {
      throw new Error("member_id and workout_id are required");
    }

    const data = SubscriptionDto.fromCreateRequest(body);

    const entity = await SubscriptionRepository.create(data);

    return SubscriptionDto.toResponseDto(entity);
  }

  static async updateSubscription(subscription_id, body) {
    if (!subscription_id) {
      throw new Error("ID is required");
    }

    const data = SubscriptionDto.fromUpdateRequest(body);

    const entity = await SubscriptionRepository.update(subscription_id, data);

    if (!entity) {
      throw new Error("Subscription not found");
    }

    return SubscriptionDto.toResponseDto(entity);
  }

  static async deleteSubscription(subscription_id) {
    if (!subscription_id) {
      throw new Error("ID is required");
    }

    const existing = await SubscriptionRepository.findById(subscription_id);

    if (!existing) {
      throw new Error("Subscription not found");
    }

    await SubscriptionRepository.deleteById(subscription_id);
  }
}

module.exports = SubscriptionService;