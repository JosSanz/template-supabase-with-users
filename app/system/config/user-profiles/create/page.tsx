import PageTitle from "@/app/_components/page-title";
import Form from "../_components/form";
import { getPermits } from "@/utils/db/queries";

export default async function Page() {
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