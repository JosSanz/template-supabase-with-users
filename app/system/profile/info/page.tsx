import PageTitle from "@/app/_components/page-title";
import Form, { FormUsers } from "./_components/form";
import { getUserSession } from "@/utils/libs/session";

export default async function Page() {
    const user = await getUserSession();

    const formData:FormUsers = {
        name: user.user_metadata.name ?? "",
        lastnames: user.user_metadata.lastnames ?? "",
        email: user.email ?? "",
        phone: user.user_metadata.phone ?? "",
    }

    return (
        <>
            <PageTitle text="Información básica" />
            <Form initialData={formData}/>
        </>
    )
}