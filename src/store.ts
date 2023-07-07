import { writable } from 'svelte/store';
import type { QueryData,UserType } from './types';
import type { Writable } from 'svelte/store';

export const userInfoStore = writable<UserType>({
  _id: '552ab7e2-45bd-42d0-a457-f873bb9d052d',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  organization: '',
  database: '',
});

export const metricData: Writable<QueryData[]> = writable<QueryData[]>([]);

export const filterMetricData: Writable<QueryData[]> = writable<QueryData[]>([]);

export const filterMetricDataTwo: Writable<QueryData[]> = writable<QueryData[]>([]);

export const redisData = writable ([]);