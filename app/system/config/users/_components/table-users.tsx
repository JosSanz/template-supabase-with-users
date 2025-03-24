import Paginator from "@/app/_components/paginator";
import Table, { TableColumnInterface } from "@/app/_components/table";
import { UserInfoDto } from "@/utils/db/dtos";
import { getUsers } from "@/utils/db/queries";
import { formatDateTime, formatPhone } from "@/utils/libs/functions";

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
]

export default async function TableUsers({
    currentPage
}:{
    currentPage: number
}) {
    const { users, totalPages } = await getUsers(currentPage);

    return (
        <>
            <Table
                columns={columns}
                data={users}
            />
            <Paginator 
				currentPage={currentPage}
				totalPages={totalPages}
			/>
        </>
    )
}