"use client";

import { usePathname, useRouter } from "next/navigation";
import Button from "@/app/_components/button";
import { ReloadIcon } from "@/app/_components/icons";

export default function Reload() {
	const pathName = usePathname();
    const { replace } = useRouter();

    const handleReload = () => {
        replace(pathName);
    }

	return (
		<Button
            onClick={handleReload}
            variant="outline-primary"
            className="!p-2"
        >
			<ReloadIcon className="size-6" />
		</Button>
	);
}
