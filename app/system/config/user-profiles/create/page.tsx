import PageTitle from "@/app/_components/page-title";
import Form from "../_components/form";
import { getPermits, getUserActionPermission } from "@/utils/db/queries";
import { redirect } from "next/navigation";
import Routes from "@/utils/libs/routes";

export default async function Page() {
    const canCreate = await getUserActionPermission('roles', 'create');

    if (!canCreate) {
        redirect(Routes.home);
    }

    const permits = await getPermits();

    return (
        <>
            <PageTitle text="Roles de usuario - Crear nuevo" />
            <Form
                action="create"
                permits={permits}
                initialData={{
                    name: '',
                    permissions: []
                }}
            />
        </>
    );
}