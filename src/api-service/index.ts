import * as NodeCache from 'node-cache';

const apicache = new NodeCache();

export function fromCache(cacheKey: string, callback: () => Promise<any>): Promise<any> {
  return new Promise((resolve: any, reject: any) => {
    const cacheValue = apicache.get(cacheKey);
    if (cacheValue) {
      console.log(`${cacheKey} from api cache`);
      resolve(cacheValue);
    } else {
      callback().then((data) => {
        console.log(`${cacheKey} from api request`);
        apicache.set(cacheKey, data);
        resolve(data);
      });
    }
  });
}
