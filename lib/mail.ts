import { Resend } from "resend"

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
        html: `<p>Tu 2FA código: ${token}</p>`,
    })

}

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`

    // CAMBIAR PARA PRODUCCION
    await resend.emails.send({
        from: "mail@libraryverse.brys.es",
        to: email,
        subject: "Restablecer contraseña",
        html: `<p>Click <a href="${resetLink}">aquí para resetear la contraseña</a></p>`

    })
}
// MEJORAR --- TAREA 23
export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    // CAMBIAR PARA PRODUCCIÓN

    const confirmLink = `${domain}/auth/new-verification?token=${token}`

    const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

        <title>Email Template</title>
        <style>
        /* Styles for the email */
        body {
            font-family: "Poppins", sans-serif;
            font-weight: 400;
            font-style: normal;
            font-family: Arial, sans-serif;
            background-color: #242424;
            color: white;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
        }
        h1 {
            text-align: center;
        }
        p {
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #00ff80;
            color: black;
            text-decoration: none;
            border-radius: 5px;
        }
        </style>
    </head>
    <body>
        <div class="container">
        <h1>Welcome to Next-Auth V5</h1>
        <p>Please confirm your email by clicking here!</p>
        <p>
            <a
            class="button"
            href="${confirmLink}"
            >Confirm your email</a
            >
        </p>
        </div>
    </body>
    </html>
    `;

    await resend.emails.send({
        from: "mail@libraryverse.brys.es",
        to: email,
        subject: "Confirmar tu correo electrónico",
        html: emailHtml,
    })
}