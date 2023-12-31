import { writable } from 'svelte/store';
import type { QueryData, UserType,RedisData } from './types';
import type { Writable } from 'svelte/store';

// initially empty, updatable through source code
export const userInfoStore = writable<UserType>({
  firstName: '',
  lastName: '',
});

// Store for main metrics array from metric get request in the home.svelte
export const metricData: Writable<QueryData[]> = writable<QueryData[]>([]);

// Store for first column on the homepage. Basically filtered metricsData based on the selection dropdown
export const filterMetricData: Writable<QueryData[]> = writable<QueryData[]>([]);

// Store for second column on the homepage. Basically filtered metricsData based on the selection dropdown
export const filterMetricDataTwo: Writable<QueryData[]> = writable<QueryData[]>([]);

// Store for Redis data
export const redisData: Writable<RedisData> = writable<RedisData>();

// Authentication status, initially false, updatable through source code
export const isAuthenticated: Writable<boolean> = writable(false);

// Loading status for running queries, initially false, updatable through source code
export const isLoading: Writable<boolean> = writable(false);

// Render the login or signup component on the userlogin page
export const renderSignup: Writable<boolean> = writable(false);