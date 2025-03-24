import PageTitle from "@/app/_components/page-title";
import Form from "../_components/form";
import { getRoles } from "@/utils/db/queries";

export default async function Page() {
    const roles = await getRoles();
    
    return (
        <>
            <PageTitle text="Usuarios del sistema - Crear nuevo" />
            <Form
                action="create"
                initialData={{
                    name: "",
                    lastnames: "",
                    email: "",
                    phone: "",
                    roleIds: []
                }}
                roles={roles}
            />
        </>
    );
}