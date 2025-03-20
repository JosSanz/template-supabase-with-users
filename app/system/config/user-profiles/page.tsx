import ButtonNew from "@/app/_components/button-new";
import PageTitle from "@/app/_components/page-title";
import { getRolesPages } from "@/utils/db/queries";
import { Routes } from "@/utils/libs/routes";
import TableUserProfiles from "./_components/table-user-profiles";
import Paginator from "@/app/_components/paginator";
import { Suspense } from "react";
import TableSkeleton from "@/app/_components/table-skeleton";

export default async function Page({
	searchParams,
}: {
	searchParams?: Promise<{
		query?: string
		page?: string
        order_by?: string
        order: string
	}>;
}) {
    const params = await searchParams;

	const query: string = params?.query || "";
	const currentPage = Number(params?.page) || 1;
	const order_by = params?.order_by || "name";
    const order = params?.order || "ascendant"

    const totalPages = await getRolesPages(query);

    return (
        <>
            <PageTitle text="Roles de usuario" />
            <div className="flex justify-end">
                <ButtonNew linkTo={Routes.user_profiles.create}/>
            </div>
            <Suspense
                key={query + currentPage + order_by + order}
				fallback={<TableSkeleton columns={['Nombre']}/>}
            >
                <TableUserProfiles
                    query={query}
                    currentPage={currentPage}
                    order_by={order_by}
                    order={order}
                />
            </Suspense>
            <Paginator 
				currentPage={currentPage}
				totalPages={totalPages}
			/>
        </>
    )
}