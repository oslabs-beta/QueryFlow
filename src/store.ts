import { writable } from 'svelte/store';
import type { QueryData, UserType,RedisData } from './types';
import type { Writable } from 'svelte/store';

// initially empty, updatable through source code
export const userInfoStore = writable<UserType>({
  firstName: '',
  lastName: '',
});

//Store for main metrics array from metric get request in the home.svelte
export const metricData: Writable<QueryData[]> = writable<QueryData[]>([]);

//Store for first column on the homepage. Basically filtered metricsData based on the selection dropdown
export const filterMetricData: Writable<QueryData[]> = writable<QueryData[]>([]);

//Store for second column on the homepage. Basically filtered metricsData based on the selection dropdown
export const filterMetricDataTwo: Writable<QueryData[]> = writable<QueryData[]>([]);

//Store for Redis data
export const redisData: Writable<RedisData> = writable<RedisData>();

// initially false, updatable through source code
export const isAuthenticated = writable(false);