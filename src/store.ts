import { writable } from 'svelte/store';

type userType = {
  _id: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  organization: string,
  database: string,
}

export const userInfoStore = writable<userType>({
  _id: '552ab7e2-45bd-42d0-a457-f873bb9d052d',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  organization: '',
  database: '',
});

export const metricData = writable ([
	
]);
