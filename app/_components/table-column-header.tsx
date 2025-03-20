'use client';

import { FC } from "react";

interface TableColumnHeaderProps {
    columnKey: string
    label: string
    className: string
    sortable: boolean
    order_by?: string
    order?: string
}

const TableColumnHeader:FC<TableColumnHeaderProps> = (props) => {
    const { columnKey, label, className, order_by, order } = props;

    const handleClick = () => {

    }

    return (
        <th
            className={className}
        >
            {label}
        </th>
    );
}
 
export default TableColumnHeader;