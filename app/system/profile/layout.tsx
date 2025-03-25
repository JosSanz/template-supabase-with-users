import PageTitle from "@/app/_components/page-title";
import Routes from "@/utils/libs/routes";
import SubmenuLink from "./_components/submenu-link";

const submenus = [
    {
        path: Routes.profile.info,
        label: 'General'
    },
    {
        path: Routes.profile.change_password,
        label: 'Contraseña'
    }
]

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <PageTitle text="Perfil de usuario" />
            <div className="md:max-w-[728px] md:mx-auto grid grid-cols-[auto_1fr] gap-8 border-t border-neutral-300">
                <div>
                    <ul>
                    {submenus.map((s, i) => (
                        <SubmenuLink
                            key={i}
                            params={s}
                        />
                    ))}
                    </ul>
                </div>
                <div className="space-y-4 pt-4">
                    {children}
                </div>
            </div>
        </>
    )
}