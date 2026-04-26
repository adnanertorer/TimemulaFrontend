export type Roles = {
	id: number;
	name: string;
	code: string;
	permissions?: Permission[];
}

export type Permission = {
	id: number;
	name: string;
	code: string;
}
