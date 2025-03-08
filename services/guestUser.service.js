import { redisSDK } from "../sdks/redis.sdk.js";

class GuestUserService {
  async getGuestUser(guestId) {
    const data = await redisSDK.get(`guest:${guestId}`);
    return data;
  }

  async setGuestUser(guestId) {
    const messagesLimit = {
      manualMessagesLeft: 3,
      autoMessagesLeft: 3,
    };
    await redisSDK.set(`guest:${guestId}`, messagesLimit);
    return messagesLimit;
  }

  async decreaseAutoMessagesLeft(guestId) {
    const data = await this.getGuestUser(guestId);
    data.autoMessagesLeft -= 1;
    await redisSDK.set(`guest:${guestId}`, data);
    return data;
  }

  async decreaseManualMessagesLeft(guestId) {
    const data = await this.getGuestUser(guestId);
    data.manualMessagesLeft -= 1;
    await redisSDK.set(`guest:${guestId}`, data);
    return data;
  }
}
export const guestUserService = new GuestUserService();
