import { createClient } from "@/utils/supabase/server";
import Sidebar from "./_components/sidebar";
import SystemState from "./_components/system-state";
import { redirect } from "next/navigation";
import Routes from "@/utils/libs/routes";

export default async function SystemLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect(Routes.root);
    }

    return (
        <SystemState>
            <div className="grid grid-cols-[auto_1fr] h-screen">
                <Sidebar user={user}/>
                <div className="overflow-y-auto overflow-x-hidden">
                    <main className="container mx-auto px-6 py-4 space-y-4">
                        {children}
                    </main>
                </div>
            </div>
        </SystemState>
    );
}