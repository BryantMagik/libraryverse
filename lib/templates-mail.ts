export const getTwoFactorTokenEmailHtml = (token: string): string => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
    <title>2FA Código</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            color: #ffa601;
        }
        .content {
            font-size: 16px;
            line-height: 1.5;
            padding: 20px;
            text-align: center;
        }
        .content p {
            margin: 0;
        }
        .token {
            display: inline-block;
            background-color: #ff8800;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 20px;
            font-weight: 600;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" bgcolor="#f4f4f4">
                <table class="container" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td class="header">
                            <h1>Tu Código de Autenticación</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                            <p>Usa el siguiente código para completar tu autenticación en dos factores:</p>
                            <div class="token"><p>

                            ${token}
                            </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`

export const getPasswordResetEmailHtml = (resetLink: string): string => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
    <title>Restablecer contraseña</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            color: #ff6b6b;
        }
        .content {
            font-size: 16px;
            line-height: 1.5;
            padding: 20px;
            text-align: center;
        }
        .content p {
            margin: 0;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #ff6b6b;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" bgcolor="#f4f4f4">
                <table class="container" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td class="header">
                            <h1>Restablecer Contraseña</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                            <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                            <a class="button" href="${resetLink}">Restablecer Contraseña</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`
export const getVerificationEmailHtml = (confirmLink: string): string => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
    <title>Confirmar tu correo electrónico</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            color: rgb(0, 0, 0);
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            color: #00ff80;
        }
        .content {
            font-size: 16px;
            line-height: 1.5;
            padding: 20px;
            text-align: center;
        }
        .content p {
            margin: 0;
            font-size: 14px;
        }
        .button {
            margin: 40px;
            display: inline-block;
            padding: 10px 20px;
            background-color: #00ff80;
            color: rgb(255, 255, 255);
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <table class="container" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td class="header">
                            <h1>Bienvenido a LibraryVerse!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                            <p>¡Gracias por unirte a LibraryVerse!</p>
                            <p>Para empezar a explorar nuestro vasto universo de conocimiento, por favor confirma tu correo electrónico haciendo clic en el botón de abajo.</p>
                            <a class="button" href="${confirmLink}">Confirmar tu correo</a>
                            <p>Si no solicitaste esta cuenta, por favor ignora este correo.</p>
                            <br>
                            <p>Saludos,<br>El equipo de LibraryVerse</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`
