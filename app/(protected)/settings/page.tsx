import { auth, signOut } from "@/auth"
import { Header } from "@/components/client/header";

const SettingsPage = async () => {
    const session = await auth()

    return (
        <div>
            <Header />
            {JSON.stringify(session)}
            <form action={async () => { "use server"; await signOut() }}>
                <button type="submit">
                    Desconectarse
                </button>
            </form>
        </div >
    )
}


export default SettingsPage