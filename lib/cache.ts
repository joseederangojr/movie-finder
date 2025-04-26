import { createClient } from "redis";

class Cache {
	private client: ReturnType<typeof createClient>;

	constructor() {
		this.client = createClient({
			url: process.env.REDIS_URL || "redis://localhost:6379",
			socket: {
				tls: process.env.REDIS_TLS === "1",
			},
		});

		this.client.on("error", (err) => console.error("Redis Client Error", err));
	}

	private async connect() {
		if (!this.client.isOpen) {
			await this.client.connect();
		}
	}

	async get(key: string): Promise<string | null> {
		await this.connect();
		return this.client.get(key);
	}

	async set(key: string, value: string, ttl: number): Promise<void> {
		await this.connect();
		await this.client.setEx(key, ttl, value);
	}
}

const cache = new Cache();
export default cache;
