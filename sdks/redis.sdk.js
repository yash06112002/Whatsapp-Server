import { createClient } from 'redis';

class RedisSDK {
    constructor() {
        this.client = createClient({
          username: process.env.REDIS_USERNAME,
          password: process.env.REDIS_PASSWORD,
          socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
          },
        });

        this.client.on("error", (err) => console.log("Redis Client Error", err));
        this.init();
    }
    async init() {
        try {
            await this.client.connect();
        } catch (err) {
            console.error("Redis Connection Error:", err);
        }
    }
    async get(key) {
        const data = await this.client.get(key);
        return JSON.parse(data);
    }
    async set(key, value) {
        const data = await this.client.set(key, JSON.stringify(value));
        return data;
    }
    async delete(key) {
        return this.client.del(key);
    }
}
export const redisSDK = new RedisSDK();