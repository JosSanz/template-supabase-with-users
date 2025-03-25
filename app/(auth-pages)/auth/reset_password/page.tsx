import { createClient } from "@/utils/supabase/server";
import ResetForm from "./_components/form";
import Link from "next/link";
import Alert from "@/app/_components/alert";
import Routes from "@/utils/libs/routes";
import PageTitle from "@/app/_components/page-title";

export default async function Page({
	searchParams,
}: {
	searchParams?: Promise<{
		token?: string;
		message?: string
	}>;
}) {
	const params = await searchParams;

	const token: string = params?.token || "";
	const message: string = params?.message || "";

	if (message !== "") {
		return (
			<>
				<h1 className="page-title">Reseteo de contraseña</h1>
				<Alert
					isVisible={message !== ""}
					text={message}
					variant="info"
				/>
				<div className="text-center">
					<Link
						className="px-4 py-2 cursor-pointer rounded border transition-colors bg-primary text-white border-primary hover:bg-primary-hover"
						href={Routes.root}
					>Regresar al inicio</Link>
				</div>
			</>
		)
	}

	const supabase = await createClient();

	const { data, error } = await supabase.auth.verifyOtp({ token_hash: token, type: 'email'});

	return (
		<>
			<PageTitle text="Reseteo de contraseña" />
			{error ?
				<>
					<Alert
						isVisible={error.message !== ""}
						text={error.message}
						variant="danger"
					/>
					<div className="text-center">
						<Link
							className="px-4 py-2 cursor-pointer rounded border transition-colors bg-primary text-white border-primary hover:bg-primary-hover"
							href={Routes.root}
						>Regresar al inicio</Link>
					</div>
				</> 
			: data.session ?	
				<ResetForm session={data.session}/>
			: null}
		</>
	)
}
