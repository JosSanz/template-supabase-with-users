import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { Routes } from "../libs/routes";

export const updateSession = async (request: NextRequest) => {
    // Create an unmodified response
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser();

    // Redirect protected routes
    if (request.nextUrl.pathname.startsWith("/system") && user.error) {
      return NextResponse.redirect(new URL(Routes.signIn, request.url));
    }

    // Redirect to welcome page if session exist 
    if (request.nextUrl.pathname === Routes.root && !user.error) {
      return NextResponse.redirect(new URL(Routes.home, request.url));
    }

    return response;
};
