import { UpdateRoleDto } from "@/utils/db/dtos";
import { RolePermission } from "@/utils/db/entities";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async function PutUserProfile(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Authorization error" }, { status: 401 });
    }

    const { id: role_id } = await params;

    const data:UpdateRoleDto = await request.json();

    const { error: roleError } = await supabase.from('roles').update({ name: data.name }).eq("id", role_id);

    if (roleError) {
        return NextResponse.json({ error: 'Error al actualizar el registro', details: roleError.message }, { status: 409 });
    }

    await supabase.from('role_permissions').delete().eq('role_id', role_id);

    const permits:RolePermission[] = data.permits.map<RolePermission>((p) => {
        return {
            role_id: role_id,
            ...p
        }
    });

    await supabase.from('role_permissions').insert(permits);

    return NextResponse.json({ success: true }, { status: 200 });
}