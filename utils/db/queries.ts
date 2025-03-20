import { createClient } from "../supabase/server";
import { PermissionGroup, RoleDto } from "./dtos";
import { Permit, Role } from "./entities";

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

export async function getRoles(query: string, currentPage: number, order_by: string, order: string):Promise<Role[]> {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const supabase = await createClient();

    const { data } = await supabase.from('roles')
        .select<'*',Role>()
        .ilike("name", `%${query}%`)
        .order(order_by, { ascending: order === "ascendant" })
        .range(offset, offset + ITEMS_PER_PAGE - 1);

    return data ?? [];
}

export async function getRolesPages(query: string): Promise<number> {
	const supabase = await createClient();

    const { count } = await supabase.from('roles')
        .select('*', { count: 'exact', head: true })
        .ilike("name", `%${query}%`);

	const totalPages = Math.ceil((count ?? 1) / ITEMS_PER_PAGE);

    return totalPages;
}