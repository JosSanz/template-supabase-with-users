import { CreateRoleDto } from "@/utils/db/dtos";
import { Role, RolePermission } from "@/utils/db/entities";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function PostUserProfile(request: NextRequest) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Authorization error" }, { status: 401 });
    }

    const data:CreateRoleDto = await request.json();

    const { data: role, error: roleError } = await supabase.from('roles').insert({ name: data.name }).select().single<Role>();

    if (roleError) {
        return NextResponse.json({ error: 'Error al guardar el registro', details: roleError.message }, { status: 409 });
    }

    const permits:RolePermission[] = data.permits.map<RolePermission>((p) => {
        return {
            role_id: role.id,
            ...p
        }
    });

    await supabase.from('role_permissions').insert(permits);

    return NextResponse.json({ success: true }, { status: 200 });
}