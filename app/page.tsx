import Image from "next/image";

export default function Home() {
    return (
        <div className="flex justify-center items-center h-dvh">
            <main className="space-y-4">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <h1>Plantilla de proyecto para usuarios y permisos</h1>
            </main>
        </div>
    );
}
