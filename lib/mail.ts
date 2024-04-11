import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    // CAMBIAR PARA PRODUCCIÓN
    const confirmLink = `http://localhost:3000/auth/new-verifications?token=
    ${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "confirm your email",
        html: `<p>Click <a href="${confirmLink}">aquí para confirmar</a></p>`
    })

}