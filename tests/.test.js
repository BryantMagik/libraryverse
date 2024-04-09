require('dotenv').config();

const { test, expect } = require('@playwright/test');

test('Prueba de Playwright con variables de entorno', async ({ page }) => {
    // Acceder a la variable de entorno BASE_URL
    const baseUrl = process.env.BASE_URL;

    // Realizar alguna acción en la página web utilizando Playwright
    await page.goto(baseUrl);

    // Verificar alguna condición en la página
    const title = await page.title();
    expect(title).toBe('Login – Vercel'); // Ajusta el título esperado aquí
});
