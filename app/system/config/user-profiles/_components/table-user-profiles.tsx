import { EditIcon } from "@/app/_components/icons";
import Table, { TableColumnInterface } from "@/app/_components/table";
import { Role } from "@/utils/db/entities";
import { getRoles } from "@/utils/db/queries";
import { Routes } from "@/utils/libs/routes";
import Link from "next/link";

const columns: TableColumnInterface<Role>[] = [
    {
        key: "name",
        sortable: true,
		label: "Nombre",
		render: (row) => row.name
	},
    {
        key: "actions",
        label: "",
        columnClass: "w-1",
        render: (row) =>
            <div>
                <Link href={`${Routes.user_profiles.update}/${row.id}`}>
                    <EditIcon className="table-button" />
                </Link>
            </div>
    }
]

export default async function TableUserProfiles({
    query,
    currentPage,
    order_by,
    order
}:{
    query: string
	currentPage: number
    order_by: string
    order: string
}) {
    const roles = await getRoles(query, currentPage, order_by, order);

    return (
        <Table
            columns={columns}
            data={roles}
            order_by={order_by}
            order={order}
        />
    )
}