'use client';

import { FC } from "react";
import { OrderAscending, OrderDescending } from "./icons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface TableColumnHeaderProps {
    columnKey: string
    label: string
    className: string
    sortable: boolean
    order_by?: string
    order?: string
}

const TableColumnHeader:FC<TableColumnHeaderProps> = (props) => {
    const { columnKey, label, className, sortable, order_by, order } = props;
    
    const searchParams = useSearchParams();
	const pathName = usePathname();
	const { replace } = useRouter();

    const handleClick = () => {
        if (!sortable) {
            return;
        }

        const params = new URLSearchParams(searchParams);

        if (order_by !== columnKey) {
            params.set("order_by", columnKey);
            params.set("order", "ascendant");
        } else {
            if (order === "ascendant") {
                params.set("order", "descendant");
            } else {
                params.set("order", "ascendant");
            }
        }

		replace(`${pathName}?${params.toString()}`);
    }

    return (
        <th
            className={`${className} ${sortable && 'cursor-pointer'}`}
            onClick={handleClick}
        >
            <div className="flex gap-2 justify-center">
                {sortable && order_by === columnKey &&
                (
                    order === "ascendant" ?
                        <OrderAscending className="size-4"/>
                    :
                        <OrderDescending className="size-4"/>
                )}
                {label}
            </div>
        </th>
    );
}
 
export default TableColumnHeader;