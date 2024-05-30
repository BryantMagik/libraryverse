

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid place-content-center bg-fondol">
            {children}
        </div>
    )
}

export default AuthLayout
