import { Resend } from "resend"
import { getPasswordResetEmailHtml, getTwoFactorTokenEmailHtml, getVerificationEmailHtml } from "./templates-mail"

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API)
const domain = process.env.NEXT_PUBLIC_API_URL

export const sendTwoFactortTokenEmail = async (
    email: string,
    token: string,
) => {
    await resend.emails.send({
        from: "mail@libraryverse.brys.es",
        to: email,
        subject: "2FA código",
        html: getTwoFactorTokenEmailHtml(token)
    })

}

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`

    await resend.emails.send({
        from: "mail@libraryverse.brys.es",
        to: email,
        subject: "Restablecer contraseña",
        html: getPasswordResetEmailHtml(resetLink),
    })
}

export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {

    const confirmLink = `${domain}/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "mail@libraryverse.brys.es",
        to: email,
        subject: "Confirmar tu correo electrónico",
        html: getVerificationEmailHtml(confirmLink),
    })
}