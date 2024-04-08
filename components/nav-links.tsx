import Link from "next/link"

const links = [
    { href: "/", label: "Home" },
    { href: "/", label: "A" },
    { href: "/auth/login", label: "Login" },
]

const Navlinks = () => {
    return (
        <>
            {links.map(link => (
                <Link href={link.href} key={link.href}>
                    {link.label}
                </Link>
            ))}
        </>
    )
}
export default Navlinks