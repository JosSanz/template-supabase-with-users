import Link from "next/link";
import Routes from "@/utils/libs/routes";

export default function NotFound() {
	return (
		<div className="flex flex-col gap-4 pt-10 justify-center items-center">
			<h1 className="text-xl text-primary">404 Not Found</h1>
            <p>No se encontró el recurso solicitado</p>
			<Link className="px-4 py-2 cursor-pointer rounded border transition-colors bg-primary text-white border-primary hover:bg-primary-hover" href={Routes.home}>Regresar al inicio</Link>
		</div>
	);
}
