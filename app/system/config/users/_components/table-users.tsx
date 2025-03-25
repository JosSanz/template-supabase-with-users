import { EditIcon } from "@/app/_components/icons";
import Paginator from "@/app/_components/paginator";
import Table, { TableColumnInterface } from "@/app/_components/table";
import { UserInfoDto } from "@/utils/db/dtos";
import { getUsers } from "@/utils/db/queries";
import { formatDateTime, formatPhone } from "@/utils/libs/functions";
import Routes from "@/utils/libs/routes";
import Link from "next/link";
import ButtonChangeStatus from "./button-change-status";
import UsersState from "./users-state";

const columns: TableColumnInterface<UserInfoDto>[] = [
    {
        key: "full_name",
		label: "Nombre completo",
		render: (row) => ((row.user_metadata.name ?? "") + " " + (row.user_metadata.lastnames ?? "")).trim()
	},
    {
        key: "email",
		label: "Correo electrónico",
		render: (row) => row.email
	},
    {
        key: "phone",
		label: "Teléfono",
		render: (row) => (row.user_metadata.phone ?? "") !== "" ? formatPhone(row.user_metadata.phone) : ""
	},
    {
        key: "validated",
		label: "Validado",
        cellClass: "text-center",
		render: (row) => (row.email_confirmed_at ?? "") !== "" ? "SI" : "NO"
	},
    {
        key: "last_signin",
		label: "Último ingreso",
		render: (row) => formatDateTime(row.last_sign_in_at ?? "")
	},
    {
        key: "active",
		label: "Activo",
        cellClass: "text-center",
		render: (row) => (row.app_metadata.active ?? false) === true ? "SI" : "NO"
	},
    {
        key: "actions",
        label: "",
        columnClass: "w-1",
        render: (row) =>
            <div className="flex gap-2">
                <Link
                    href={`${Routes.users.update}/${row.id}`}
                    className="table-button"
                >
                    <EditIcon />
                </Link>
                <ButtonChangeStatus data={row}/>
            </div>
    }
]

export default async function TableUsers({
    currentPage
}:{
    currentPage: number
}) {
    const { users, totalPages } = await getUsers(currentPage);

    return (
        <UsersState>
            <Table
                columns={columns}
                data={users}
            />
            <Paginator 
				currentPage={currentPage}
				totalPages={totalPages}
			/>
        </UsersState>
    )
}