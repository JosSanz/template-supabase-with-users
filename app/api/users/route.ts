import { CreateUserDto } from "@/utils/db/dtos";
import { UserRole } from "@/utils/db/entities";
import Routes from "@/utils/libs/routes";
import { createAdminClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export const POST = async function PostUser(request: NextRequest) {
    const supabase = await createAdminClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Authorization error" }, { status: 401 });
    }

    const data:CreateUserDto = await request.json();

    const origin = (await headers()).get("origin");

    const { data: createdUser, error } = await supabase.auth.admin.inviteUserByEmail(data.email, {
        redirectTo: `${origin}${Routes.reset_password}`,
    });

    if (error) {
        return NextResponse.json({ error: 'Error al crear el usuario', details: error.message }, { status: 409 });
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(createdUser.user.id, {
        user_metadata: data.metadata,
        app_metadata: {
            active: true
        }
    })

    if (updateError) {
        return NextResponse.json({ error: 'Error al actualizar los datos del usuario', details: updateError.message }, { status: 409 });
    }

    const userRoles:UserRole[] = data.roleIds.map<UserRole>((r) => {
        return {
            user_id: createdUser.user.id,
            role_id: r
        }
    });

    await supabase.from('user_roles').insert(userRoles);

    return NextResponse.json({ success: true }, { status: 200 });
}