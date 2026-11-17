import { withAuth } from "next-auth/middleware";

// Mount-aware sign-in: behind the /contentplanner nginx mount, a bare
// "/login" redirect lands on the MAIN CRM (404). NEXTAUTH_URL already
// carries the public mount, so derive the absolute sign-in URL from it.
const signIn = process.env.NEXTAUTH_URL
  ? `${process.env.NEXTAUTH_URL.replace(/\/$/, "")}/login`
  : "/login";

export default withAuth({
  pages: {
    signIn,
  },
});

export const config = { matcher: ["/dashboard/:path*", "/settings/:path*", "/finance/:path*", "/campaigns/:path*", "/ai-studio/:path*"] };
