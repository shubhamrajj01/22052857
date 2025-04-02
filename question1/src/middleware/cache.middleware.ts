import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';

const cache = new NodeCache();

export const cacheMiddleware = (duration: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      res.set('Content-Type', 'application/json');
      return res.send(cachedResponse);
    }

    const originalSend = res.send.bind(res);
    res.send = (body) => {
      cache.set(key, body, duration);
      originalSend(body);
      return res;
    };

    next();
  };
};

export const clearCache = (key: string) => {
  cache.del(key);
};

export const clearAllCache = () => {
  cache.flushAll();
};

export const getCache = () => {
  return cache;
};