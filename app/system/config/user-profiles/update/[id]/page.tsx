import PageTitle from "@/app/_components/page-title";
import { getPermits, getRole, getUserActionPermission } from "@/utils/db/queries";
import Form, { FormUserProfile } from "../../_components/form";
import { redirect } from "next/navigation";
import Routes from "@/utils/libs/routes";

export default async function Page({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const canUpdate = await getUserActionPermission('roles', 'update');

    if (!canUpdate) {
        redirect(Routes.home);
    }

    const { id } = await params;

    const permits = await getPermits();
    const role = await getRole(id);

    if (role === null) {
        redirect(Routes.user_profiles.list);
    }

    const data:FormUserProfile = {
        name: role.name,
        permissions: role.role_permissions
    }

    return (
        <>
            <PageTitle text="Roles de usuario - Editar" />
            <Form
                id={id}
                action="update"
                permits={permits}
                initialData={data}
            />
        </>
    );
}