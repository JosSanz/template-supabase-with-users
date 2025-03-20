'use client';

import { Fragment, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

const max = 4;

export default function Paginator({ 
    totalPages,
    currentPage
}:{
    totalPages: number
    currentPage: number
}) {
    const searchParams = useSearchParams();
	const pathName = usePathname();
	const { replace } = useRouter();

	const [ pageStart, setPageStart ] = useState(1);
	const [ pageEnd, setPageEnd ] = useState(1);
	const [ pageArray, setPageArray ] = useState<number[]>([]);

	useEffect(() => {
		if (totalPages > max) {
			let start = currentPage - 2;
			
			if (start <= 1) {
				start = 1;
			} else if (currentPage !== totalPages) {
				start = currentPage - 1;
			}

			setPageStart(start);

			let end = currentPage + 2;
			
			if (end >= totalPages) {
				end = totalPages;
			} else if (currentPage !== 1) {
				end = currentPage + 1;
			}

			setPageEnd(end);
		}
	}, [ currentPage, totalPages ]);

	useEffect(() => {
		setPageStart(1);

		if (totalPages > max) {
			setPageEnd(max - 1);
		} else {
			setPageEnd(totalPages);
		}
	}, [totalPages]);

	useEffect(() => {
		makePageArray();
	}, [ pageStart, pageEnd ]); //eslint-disable-line

	const makePageArray = () => {
		const paginator = [];

		for(let i = pageStart; i <= pageEnd; i++) {
			paginator.push(i);
		}

		setPageArray(paginator);
	}

    const onPageChange = (page: number) => {
		const params = new URLSearchParams(searchParams);

		params.set("page", page.toString());

		replace(`${pathName}?${params.toString()}`);
	}

	return (
		<nav className="flex items-center justify-end gap-x-1" aria-label="Pagination">
			<button
				type="button"
				disabled={currentPage === 1}
				className="min-h-[38px] min-w-[38px] py-2 px-2.5 flex justify-center items-center gap-x-2 text-sm rounded-lg text-neutral-800 hover:bg-neutral-300 focus:outline-none focus:bg-neutral-300 disabled:opacity-50 disabled:pointer-events-none"
				aria-label="Previa"
				onClick={() => currentPage === 1 ? null : onPageChange(currentPage - 1)}
			>
				<ArrowLeftIcon className="shrink-0 size-3.5" />
				<span className="sr-only">Previa</span>
			</button>
			<div className="flex items-center gap-x-1">
			{pageStart > 1 &&
                <Fragment>
                    <button
                        type="button"
                        onClick={() => currentPage === 1 ? null : onPageChange(1)}
                        className={`${currentPage === 1 ? "bg-neutral-300": ""} min-h-[38px] min-w-[38px] text-sm rounded-lg text-neutral-800 hover:bg-neutral-300 focus:outline-none focus:bg-neutral-300 disabled:opacity-50 disabled:pointer-events-none`}
                        aria-current={currentPage === 1 ? "page" : "false"}
                    >1</button>
                    <div className='min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm rounded-lg'>
                        ...
                    </div>
                </Fragment>
			}
			{pageArray.map((page, i) => (
				<button
					key={i}
					type="button"
					onClick={() => currentPage === page ? null : onPageChange(page)}
					className={`${currentPage === page ? "bg-neutral-300": ""} min-h-[38px] min-w-[38px] flex justify-center items-center text-sm rounded-lg text-neutral-800 hover:bg-neutral-300 focus:outline-none focus:bg-neutral-300 disabled:opacity-50 disabled:pointer-events-none`}
					aria-current={currentPage === page ? "page" : "false"}
				>{page}</button>
			))}
			{pageEnd < totalPages &&
			<Fragment>
				<div className='min-h-[38px] min-w-[38px] flex justify-center items-center  py-2 px-3 text-sm rounded-lg'>
					...
				</div>
				<button
					type="button"
					onClick={() => currentPage === totalPages ? null : onPageChange(totalPages)}
					className={`${currentPage === totalPages ? "border border-gray-300": ""} min-h-[38px] min-w-[38px] flex justify-center items-center text-sm rounded-lg text-neutral-800 hover:bg-neutral-300 focus:outline-none focus:bg-neutral-300 disabled:opacity-50 disabled:pointer-events-none`}
					aria-current={currentPage === totalPages ? "page" : "false"}
				>{totalPages}</button>
			</Fragment>
			}
			</div>
			<button
				type="button"
				disabled={currentPage === totalPages}
				className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-neutral-800 hover:bg-neutral-300 focus:outline-none focus:bg-neutral-300 disabled:opacity-50 disabled:pointer-events-none"
				aria-label="Siguiente"
				onClick={() => currentPage === totalPages ? null : onPageChange(currentPage + 1)}
			>
				<span className="sr-only">Siguiente</span>
				<ArrowRightIcon className="shrink-0 size-3.5" />
			</button>
		</nav>
	);
}