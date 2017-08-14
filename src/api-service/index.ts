import * as NodeCache from 'node-cache';

// reference to api cache - will cache everything for 2 hours
const apicache = new NodeCache({stdTTL: 7200});

/**
 * Retrieves items from cache or sets cache value as per callback
 */
export function fromCache(cacheKey: string, callback: () => Promise<any>): Promise<any> {
  return new Promise((resolve: any, reject: any) => {
    const cacheValue = apicache.get(cacheKey);
    if (cacheValue) {
      resolve(cacheValue);
    } else {
      callback().then((data) => {
        apicache.set(cacheKey, data);
        resolve(data);
      });
    }
  });
}
