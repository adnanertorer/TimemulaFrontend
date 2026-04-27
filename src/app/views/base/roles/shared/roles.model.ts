export type Roles = {
	id: number;
	name: string;
	code: string;
	permissions?: Permission[];
	rolePermissions?: RolePermission[];
}

export type Permission = {
	id: number;
	name: string;
	code: string;
	description?: string;
}

export type RolePermission = {
	id?: number;
	roleId: number;
	permissionId: number;
	permission: Permission;
}
