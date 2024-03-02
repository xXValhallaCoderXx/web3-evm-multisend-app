// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export { auth as middleware } from "./auth.config";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
