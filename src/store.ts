import { writable } from 'svelte/store';
import type { QueryData, UserType,RedisData } from './types';
import type { Writable } from 'svelte/store';

// initially empty, updatable through source code
export const userInfoStore = writable<UserType>({
  _id: '37e2e7e2-1bcb-4b51-a811-080fb1648523',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  organization: '',
  database: '',
});

//Store for main metrics array from metric get request in the home.svelte
export const metricData: Writable<QueryData[]> = writable<QueryData[]>([]);

//Store for first column on the homepage. Basically filtered metricsData based on the selection dropdown
export const filterMetricData: Writable<QueryData[]> = writable<QueryData[]>([]);

//Store for second column on the homepage. Basically filtered metricsData based on the selection dropdown
export const filterMetricDataTwo: Writable<QueryData[]> = writable<QueryData[]>([]);

//Store for Redis data
export const redisData:Writable<RedisData> = writable<RedisData>();