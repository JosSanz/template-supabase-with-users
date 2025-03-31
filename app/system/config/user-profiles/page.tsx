import ButtonNew from "@/app/_components/button-new";
import PageTitle from "@/app/_components/page-title";
import { getRolesPages, getUserActionPermission } from "@/utils/db/queries";
import Routes from "@/utils/libs/routes";
import TableUserProfiles from "./_components/table-user-profiles";
import Paginator from "@/app/_components/paginator";
import { Suspense } from "react";
import TableSkeleton from "@/app/_components/table-skeleton";
import Search from "../../_components/search";
import Reload from "../../_components/reload";
import ShowAll from "../../_components/show-all";
import { redirect } from "next/navigation";

export default async function Page({
	searchParams,
}: {
	searchParams?: Promise<{
		query?: string
		page?: string
        show_all?: string
        order_by?: string
        order: string
	}>;
}) {
    const canRead = await getUserActionPermission('roles', 'read');

    if (!canRead) {
        redirect(Routes.home);
    }

    const canCreate = await getUserActionPermission('roles', 'create');

    const params = await searchParams;

	const query: string = params?.query || "";
	const currentPage = Number(params?.page) || 1;
    const showAll = (params?.show_all ?? "") === "true";
	const order_by = params?.order_by || "name";
    const order = params?.order || "ascendant";

    const totalPages = await getRolesPages(query, showAll);

    return (
        <>
            <PageTitle text="Roles de usuario" />
            <div className="grid grid-cols-[1fr_auto] items-end gap-4">
                <div className="flex gap-2">
                    <Search 
						placeholder="Filtrar"
						resetPage={true}
					/>
                    <ShowAll />
                </div>
                <div className="flex gap-2">
                    <Reload />
                    {canCreate && <ButtonNew linkTo={Routes.user_profiles.create}/>}
                </div>
            </div>
            <Suspense
                key={query + currentPage + order_by + order + showAll}
				fallback={<TableSkeleton columns={['Nombre', 'Activo']}/>}
            >
                <TableUserProfiles
                    query={query}
                    currentPage={currentPage}
                    order_by={order_by}
                    order={order}
                    showAll={showAll}
                />
            </Suspense>
            <Paginator 
				currentPage={currentPage}
				totalPages={totalPages}
			/>
        </>
    )
}