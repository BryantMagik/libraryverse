import authConfig from "@/auth.config"
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes"
import NextAuth from "next-auth"

import { useRouter } from 'next/router';

export default async function auth(req: { auth?: any; nextUrl?: any; }) {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null;
    }
    if (isAuthRoute) {
        if (!isLoggedIn) {
            const redirectUrl = new URL(DEFAULT_LOGIN_REDIRECT, nextUrl).toString();
            const router = useRouter();
            router.push(redirectUrl);
        }
        return null;
    }
    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
    }
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};