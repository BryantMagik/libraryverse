import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `http://localhost:3000/auth/new-password?token${token}`

    // CAMBIAR PARA PRODUCCION
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Restablecer contraseña",
        html: `<p>Click <a href="${resetLink}">aquí para resetear la contraseña</a></p>`

    })
}

export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    // CAMBIAR PARA PRODUCCIÓN
    const confirmLink = `http://localhost:3000/auth/new-verification?token=
    ${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirmar tu correo electrónico",
        html: `<p>Click <a href="${confirmLink}">aquí para confirmar</a></p>`
    })

}