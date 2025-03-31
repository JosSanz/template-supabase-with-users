'use client';

import Checkbox from "@/app/_components/checkbox";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ChangeEventHandler } from "react";

export default function ShowAll() {
    const searchParams = useSearchParams();
	const pathName = usePathname();
	const { replace } = useRouter();

    const handleClick:ChangeEventHandler<HTMLInputElement> = (e) => {
        const params = new URLSearchParams(searchParams);

        if (e.currentTarget.checked) {
			params.set("show_all", "true");
		} else {
			params.delete("show_all");
		}

		params.set("page", "1");

		replace(`${pathName}?${params.toString()}`);
    }

    return (
        <Checkbox
            showLabel
            label="Ver todos"
            checked={(searchParams.get("show_all") ?? "") === "true"}
            onChange={handleClick}
        />
    )
}