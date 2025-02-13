import type { CacheStrategy } from "./CacheStrategy"
import { FileCacheStrategy } from "./FileCacheStrategy"
import { RedisCacheStrategy } from "./RedisCacheStrategy"

type CacheType = "file" | "redis"

export class CacheFactory {
  private static instance: CacheFactory
  private strategies: Map<CacheType, CacheStrategy>

  private constructor() {
    this.strategies = new Map()
    this.strategies.set("file", new FileCacheStrategy())
    this.strategies.set("redis", new RedisCacheStrategy())
  }

  public static getInstance(): CacheFactory {
    if (!CacheFactory.instance) {
      CacheFactory.instance = new CacheFactory()
    }
    return CacheFactory.instance
  }

  public getStrategy(type: CacheType): CacheStrategy {
    const strategy = this.strategies.get(type)
    if (!strategy) {
      throw new Error(`Cache strategy '${type}' not found`)
    }
    return strategy
  }
}

