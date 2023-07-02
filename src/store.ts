import { writable } from 'svelte/store';

export const userInfoStore = writable({
	_id: '',
	first_name: '',
	last_name: '',
	email: '',
	password: '',
	organization: '',
	database: '',
});
