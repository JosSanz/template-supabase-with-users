import Sidebar from "./_components/sidebar";

export default async function SystemLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid grid-cols-[auto_1fr] h-screen">
            <Sidebar />
            <div className="overflow-y-auto overflow-x-hidden">
                <main className="container mx-auto px-6 py-4 space-y-4">
                    {children}
                </main>
            </div>
        </div>
    );
}