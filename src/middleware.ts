import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
export default function middleware(req: any) {
    return withAuth(req, {
        isReturnToCurrentPage: true,
        loginPage: '/api/auth/login'
    });
}
export const config = {
    matcher: ["/dashboard/:path*"]
};