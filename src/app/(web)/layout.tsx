import NavbarMain from "@/components/navbar/navbar";
import type { ReactNode } from "react";

export default function WebLayout({
    children,
}: {
    readonly children: ReactNode;
}) {
    return (
        <>
            <NavbarMain />
            <main>{children}</main>
        </>
    );
}
