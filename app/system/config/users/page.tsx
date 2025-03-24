import PageTitle from "@/app/_components/page-title";
import Search from "../../_components/search";
import ShowAll from "../../_components/show-all";
import Reload from "../../_components/reload";
import ButtonNew from "@/app/_components/button-new";
import Routes from "@/utils/libs/routes";
import TableUsers from "./_components/table-users";

export default async function Page({
	searchParams,
}: {
	searchParams?: Promise<{
		page?: string
	}>;
}) {
    const params = await searchParams;

	const currentPage = Number(params?.page) || 1;

    return (
        <>
            <PageTitle text="Usuarios del sistema" />
            <div className="flex gap-2 justify-end">
                <Reload />
                <ButtonNew linkTo={Routes.users.create}/>
            </div>
            <TableUsers currentPage={currentPage} />
        </>
    )
}