import { signOutAction } from "@/utils/actions/auth";

export const SignOutButton = ({
    className = ""
}:{
    className?: string
}) => (
    <form action={signOutAction}>
        <button type="submit" className={className}>Cerrar sesión</button>
    </form>
);