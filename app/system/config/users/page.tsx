import PageTitle from "@/app/_components/page-title";
import Reload from "../../_components/reload";
import ButtonNew from "@/app/_components/button-new";
import Routes from "@/utils/libs/routes";
import TableUsers from "./_components/table-users";
import TableSkeleton from "@/app/_components/table-skeleton";
import { Suspense } from "react";
import { getUserActionPermission } from "@/utils/db/queries";
import { redirect } from "next/navigation";

export default async function Page({
	searchParams,
}: {
	searchParams?: Promise<{
		page?: string
	}>;
}) {
    const canRead = await getUserActionPermission('users', 'read');

    if (!canRead) {
        redirect(Routes.home);
    }

    const canCreate = await getUserActionPermission('users', 'create');
    
    const params = await searchParams;

	const currentPage = Number(params?.page) || 1;

    return (
        <>
            <PageTitle text="Usuarios del sistema" />
            <div className="flex gap-2 justify-end">
                <Reload />
                {canCreate && <ButtonNew linkTo={Routes.users.create}/>}
            </div>
            <Suspense
                key={"page_" + currentPage}
				fallback={<TableSkeleton columns={['Nombre']}/>}
            >
                <TableUsers currentPage={currentPage} />
            </Suspense>
        </>
    )
}