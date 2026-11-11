import createProxy from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createProxy(routing);

export const config = {
  // Skip static assets, API routes, Next internals, and the admin console
  // so /admin is not rewritten to /en/admin.
  matcher: ["/((?!api|_next|admin|.*\\..*).*)"],
};
