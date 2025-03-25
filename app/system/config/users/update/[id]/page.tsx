import PageTitle from "@/app/_components/page-title";
import { getRoles, getUser, getUserRoles } from "@/utils/db/queries";
import Form, { FormUsers } from "../../_components/form";
import { redirect } from "next/navigation";
import Routes from "@/utils/libs/routes";

export default async function Page({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const roles = await getRoles();
    const user = await getUser(id);

    if (user === null) {
        redirect(Routes.users.list);
    }

    const user_roles = await getUserRoles(user.id);

    const data:FormUsers = {
        name: user.user_metadata.name ?? "",
        lastnames: user.user_metadata.lastnames ?? "",
        email: user.email ?? "",
        phone: user.user_metadata.phone ?? "",
        roleIds: user_roles.map(r => r.role_id)
    }

    return (
        <>
            <PageTitle text="Roles de usuario - Editar" />
            <Form
                id={id}
                action="update"
                roles={roles}
                initialData={data}
            />
        </>
    );
}