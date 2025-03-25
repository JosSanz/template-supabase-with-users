'use server';

import { createAdminClient, createClient } from "../supabase/server";
import { PermissionGroup, RoleDto, UserInfoDto, UserListDto } from "./dtos";
import { Permit, Role, UserRole } from "./entities";

const ITEMS_PER_PAGE = 100;

export async function getPermits():Promise<PermissionGroup[]> {
    const supabase = await createClient();

    const { data } = await supabase.from('permits').select<'*',Permit>();

    if (!data) return [];

    const permits = data.reduce<PermissionGroup[]>((arr, permit) => {
        const pos = arr.findIndex(a => a.key === permit.menu);

        if (pos < 0) {
            return [...arr, {
                key: permit.menu,
                actions: [permit]
            }];
        }
        else {
            return arr.map(a => {
                if (a.key === permit.menu) {
                    return {
                        ...a,
                        actions: [...a.actions, permit]
                    };
                }

                return a;
            });
        }
    }, []);

    return permits;
}

export async function getRole(id: string):Promise<RoleDto | null> {
    const supabase = await createClient();

    const { data } = await supabase.from('roles')
        .select(`*, role_permissions(*)`)
        .eq("id", id)
        .single<RoleDto>();

    return data;
}

export async function getRoles():Promise<Role[]> {
    const supabase = await createClient();

    const { data } = await supabase.from('roles')
        .select<'*',Role>()
        .order("name", { ascending: true });

    return data ?? [];
}

export async function getRolesList(query: string, currentPage: number, order_by: string, order: string, showAll: boolean):Promise<Role[]> {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const supabase = await createClient();

    let queryFn = supabase.from('roles')
        .select<'*',Role>()
        .ilike("name", `%${query}%`);

    if (!showAll) {
        queryFn = queryFn.eq("active", true);
    }

    const { data } = await queryFn.order(order_by, { ascending: order === "ascendant" })
        .range(offset, offset + ITEMS_PER_PAGE - 1);

    return data ?? [];
}

export async function getRolesPages(query: string, showAll: boolean): Promise<number> {
	const supabase = await createClient();

    let queryFn = supabase.from('roles')
        .select('*', { count: 'exact', head: true })
        .ilike("name", `%${query}%`);

    if (!showAll) {
        queryFn = queryFn.eq("active", true);
    }

    const { count } = await queryFn;

	const totalPages = Math.ceil((count ?? 1) / ITEMS_PER_PAGE);

    return totalPages;
}

export async function getUser(id: string):Promise<UserInfoDto | null> {
    const supabase = await createAdminClient();

    const { data } = await supabase.auth.admin.getUserById(id);

    return data.user;
}

export async function getUsers(currentPage: number):Promise<UserListDto> {
    const supabase = await createAdminClient();

    const { data } = await supabase.auth.admin.listUsers({ page: currentPage, perPage: ITEMS_PER_PAGE });

    const response:UserListDto = {
        users: data.users,
        totalPages: 0
    };

    if ('total' in data) {
        response.totalPages = Math.ceil(data.total / ITEMS_PER_PAGE);
    }
    
    return response;
}

export async function getUserRoles(user_id: string):Promise<UserRole[]> {
    const supabase = await createClient();

    const { data } = await supabase.from('user_roles').select<'*', UserRole>().eq('user_id', user_id);

    return data ?? [];
}