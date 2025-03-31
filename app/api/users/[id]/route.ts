import { UpdateUserDto } from "@/utils/db/dtos";
import {  UserRole } from "@/utils/db/entities";
import { createAdminClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async function ChangeUserProfileStatus(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createAdminClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Authorization error" }, { status: 401 });
    }

    const { id } = await params;

    const { data, error } = await supabase.auth.admin.getUserById(id);

    if (error) {
        return NextResponse.json({ error: 'Registro no encontrado', details: error.message }, { status: 405 });
    }

    const { error: userError } = await supabase.auth.admin.updateUserById(id, {
        app_metadata: {
            active: !(data.user.app_metadata.active ?? false)
        }
    })

    if (userError) {
        return NextResponse.json({ error: 'Error al actualizar el registro', details: userError.message }, { status: 409 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}

export const PUT = async function PutUser(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createAdminClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Authorization error" }, { status: 401 });
    }

    const { id: user_id } = await params;

    const data:UpdateUserDto = await request.json();

    const { error: userError } = await supabase.auth.admin.updateUserById(user_id, {
        email: data.email,
        user_metadata: data.metadata
    })

    if (userError) {
        return NextResponse.json({ error: 'Error al actualizar el registro', details: userError.message }, { status: 409 });
    }

    await supabase.from('user_roles').delete().eq('user_id', user_id);

    const userRoles:UserRole[] = data.roleIds.map<UserRole>((r) => {
        return {
            user_id: user_id,
            role_id: r
        }
    });

    await supabase.from('user_roles').insert(userRoles);

    return NextResponse.json({ success: true }, { status: 200 });
}