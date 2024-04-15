

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="grid place-content-center mt-10">
                {children}
            </div>
        </>
    )
}

export default AuthLayout
