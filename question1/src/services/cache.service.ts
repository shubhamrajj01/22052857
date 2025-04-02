import { Injectable } from '@nestjs/common';
import NodeCache from 'node-cache';

@Injectable()
export class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  set<T>(key: string, value: T, ttl?: number): boolean {
    return this.cache.set<T>(key, value, ttl);
  }

  del(key: string): number {
    return this.cache.del(key);
  }

  flushAll(): void {
    this.cache.flushAll();
  }

  getCache(): NodeCache {
    return this.cache;
  }
}