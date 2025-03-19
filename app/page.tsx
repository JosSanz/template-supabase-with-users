import Image from "next/image";
import Link from "next/link";
import { Routes } from "@/utils/libs/routes";

export default function Home() {
    return (
        <div className="flex justify-center items-center h-dvh">
            <main className="space-y-4">
                <Image
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <h1>Plantilla de proyecto para usuarios y permisos</h1>
                <Link href={Routes.signIn}>Iniciar sesión</Link>
            </main>
        </div>
    );
}
