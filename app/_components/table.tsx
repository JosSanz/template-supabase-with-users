import { JSX, ReactNode } from "react";
import TableColumnHeader from "./table-column-header";

export interface TableColumnInterface<T> {
    key: string
    sortable?: boolean
    label: string
    columnClass?: string
    cellClass?: string | ((row: T) => string)
    render: (row: T, index: number) => ReactNode
}

export interface TableInterface<T> {
    columns: TableColumnInterface<T>[]
    data: T[]
	order_by?: string
    order?: string
}

const Table = <T,>({ columns, data, order_by, order }: TableInterface<T>) => {
	return (
		<table className="table">
			<thead className="sticky top-0">
				<tr>
                {columns.map((col, i) => (
					<TableColumnHeader
						columnKey={col.key}
						label={col.label}
						className={col.columnClass ?? ""}
						sortable={col.sortable ?? false}
						order_by={order_by}
						order={order}
						key={i}
					/>
                ))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, i) => (
					<tr key={i}>
                    {columns.map((col, j) => (
						<td
                            key={j}
							className={typeof col.cellClass === 'function' ? col.cellClass(row) : col.cellClass ?? ""}
                        >
                            {col.render(row, i)}
						</td>
                    ))}
					</tr>
				))}
				{data.length === 0 && (
					<tr>
						<td colSpan={columns.length} className="text-center text-sm">
							No se encontraron registros
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default Table as <T,>(props: TableInterface<T>) => JSX.Element;
