import { AuthButton } from "./AuthButton";

export default function NavbarMain() {
    return (
        <nav className="w-full flex justify-between h-14 items-center px-4">
            <h1 className="font-bold text-2xl">Navbar</h1>
            <AuthButton/>
        </nav>
    )
}