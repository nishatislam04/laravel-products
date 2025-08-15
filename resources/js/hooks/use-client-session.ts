import { usePage } from "@inertiajs/react";

type User = {
    id: number;
    name: string;
    email: string;
}

type AuthProps = {
    auth: {user: User} | null;
}

function useClientSession() {
    const {auth} = usePage().props as unknown as AuthProps;
    return auth?.user || null;
}

export default useClientSession;
