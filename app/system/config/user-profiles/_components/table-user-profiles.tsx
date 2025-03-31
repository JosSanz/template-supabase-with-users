import { EditIcon } from "@/app/_components/icons";
import Table, { TableColumnInterface } from "@/app/_components/table";
import { Role } from "@/utils/db/entities";
import { getRolesList, getUserActionPermission } from "@/utils/db/queries";
import Routes from "@/utils/libs/routes";
import Link from "next/link";
import ButtonChangeStatus from "./button-change-status";
import UserProfilesState from "./user-profiles-state";

const columns: TableColumnInterface<Role>[] = [
    {
        key: "name",
        sortable: true,
        label: "Nombre",
        render: (row) => row.name
    },
    {
        key: "active",
        label: "Activo",
        columnClass: "w-1",
        cellClass: "text-center",
        render: (row) => row.active ? "SI" : "NO"
    }
];

export default async function TableUserProfiles({
    query,
    currentPage,
    order_by,
    order,
    showAll
}:{
    query: string
	currentPage: number
    order_by: string
    order: string
    showAll: boolean
}) {
    const roles = await getRolesList(query, currentPage, order_by, order, showAll);

    const canUpdate = await getUserActionPermission('roles', 'update');
    const canDelete = await getUserActionPermission('roles', 'delete');

    const columnsToShow = [...columns];

    if (canUpdate || canDelete) {
        columnsToShow.push({
            key: "actions",
            label: "",
            columnClass: "w-1",
            render: (row) =>
                <div className="flex gap-2">
                    {canUpdate &&
                        <Link
                            href={`${Routes.user_profiles.update}/${row.id}`}
                            className="table-button"
                        >
                            <EditIcon />
                        </Link>
                    }
                    {canDelete && <ButtonChangeStatus data={row}/>}
                </div>
        });
    }

    return (
        <UserProfilesState>
            <Table
                columns={columnsToShow}
                data={roles}
                order_by={order_by}
                order={order}
            />
        </UserProfilesState>
    )
}