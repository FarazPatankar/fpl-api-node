import * as NodeCache from 'node-cache';

// standard cache timeout (30 mins)
export const stdCacheTTL = 1800;

// reference to cache object
export const cache = new NodeCache();
