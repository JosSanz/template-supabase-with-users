import Tooltip from "@/app/_components/tooltip";
import { MenuInterface } from "./sidebar";
import Link from "next/link";
import { useSidebarContext } from "./sidebar-state";

const MenuItem = ({
    item,
}:{
    item: MenuInterface
}) => {
    const { isOpen: sidebarOpen } = useSidebarContext();

    const { icon, label, href} = item;

    return (
        <li>
            <Link
                href={href ?? ''}
                className="group relative cursor-pointer min-h-[40px] flex items-center gap-2 text-white p-2 rounded transition hover:bg-primary-hover"
            >
                {icon}
                {sidebarOpen && <span>{label}</span>}
                {!sidebarOpen && <Tooltip text={label} position="right"/>}
            </Link>
        </li>
    );
}
 
export default MenuItem;