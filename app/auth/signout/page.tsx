
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
export default function SignOut() {
    if (typeof window === "undefined") {
        redirect(`/api/auth/signout/azureb2c`);           
    }
    return null;
}