import ButtonNew from "@/app/_components/button-new";
import PageTitle from "@/app/_components/page-title";
import { Routes } from "@/utils/libs/routes";

export default async function Page() {
    return (
        <>
            <PageTitle text="Roles de usuario" />
            <div className="flex justify-end">
                <ButtonNew linkTo={Routes.user_profiles.create}/>
            </div>
        </>
    )
}