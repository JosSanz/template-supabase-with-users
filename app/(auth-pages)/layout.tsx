import Image from "next/image";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex items-center justify-center h-dvh">
            <div className="w-2xl rounded shadow-2xl grid grid-cols-2">
                <div className="flex items-center justify-center p-4">
                    <Image
                        src="/next.svg"
                        alt="Next.js logo"
                        width={180}
                        height={38}
                        priority
                    />
                </div>
                <div className="p-4 space-y-4">
                    {children}
                </div>
            </div>
        </main>
    )
}