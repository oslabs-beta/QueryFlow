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
  _id: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  organization: '',
  database: '',
});

export const metricData = writable ([
	
]);
