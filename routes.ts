/**
 * An array
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

/**
 * Rutas usadas para la authenticación estas rutas redirigen a los usuarios 
 * logeados hacia /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
]
/**
 * @type {string[]}
 */

export const apiAuthPrefix = "/api/auth"
/**
 * @type {string[]}
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard"