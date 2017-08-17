import * as NodeCache from 'node-cache';

// reference to api cache - will cache everything for 2 hours
const cache = new NodeCache({stdTTL: 7200});

/**
 * Retrieves items from cache or sets cache value as per callback
 */
export function fromCache(cacheKey: string, callback: () => Promise<any>): Promise<any> {
  return new Promise((resolve: any, reject: any) => {
    const cacheValue = cache.get(cacheKey);
    if (cacheValue) {
      console.log(`${cacheKey} from cache`);
      resolve(cacheValue);
    } else {
      callback().then((data) => {
        console.log(`${cacheKey} from request`);
        cache.set(cacheKey, data);
        resolve(data);
      });
    }
  });
}
