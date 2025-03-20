export default function TableSkeleton({
    columns
}:{
    columns: string[]
}) {
    return (
        <table className="table">
            <thead className="sticky top-14">
                <tr>
                {columns.map((col, i) => (
                    <th key={i}>{col}</th>
                ))}
                </tr>
            </thead>
            <tbody>
            {[...Array(10)].map((_,i) => (
                    <tr className="animate-pulse" key={i}>
                    {[...Array(columns.length)].map((_, j) => (
                        <td key={j}>
                            <div className="h-6 skeleton"></div>
                        </td>
                    ))}
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}