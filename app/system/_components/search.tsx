"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "@/app/_components/icons";
import FormControl from "@/app/_components/form-control";

export default function Search({ 
	placeholder,
	resetPage
}: { 
	placeholder: string
	resetPage?: boolean
}) {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);

		if (term) {
			params.set("query", term);
		} else {
			params.delete("query");
		}

		if (resetPage === true) {
			params.set("page", "1");
		}

		replace(`${pathName}?${params.toString()}`);
	}, 300);

	return (
		<div className="relative flex flex-1 flex-shrink-0 md:max-w-80">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<FormControl
                className="peer !pl-10"
				placeholder={placeholder}
				onChange={(e) => handleSearch(e.target.value)}
				defaultValue={searchParams.get("query")?.toString()}
			/>
			<SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
		</div>
	);
}
