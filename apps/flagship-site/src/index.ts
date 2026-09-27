import { getEnv } from "./config/env";
import { renderRoute } from "./lib/render";

function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-store",
      ...headers,
    },
  });
}

function securityHeaders(contentType: string): Record<string, string> {
  return {
    "Content-Type": contentType,
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Content-Security-Policy":
      "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https:; script-src 'self';",
  };
}

export interface JpvHttpApplication {
  fetch(request: Request, environment?: Record<string, unknown>): Promise<Response>;
}

export const application: JpvHttpApplication = {
  async fetch(request: Request, rawEnv: Record<string, unknown> = {}): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return json({
        status: "ok",
        system: "JPV Public Runtime",
        authority: "JPV",
      });
    }

    if (url.pathname.startsWith("/admin/") || url.pathname === "/protected") {
      return json(
        {
          error: "NOT_FOUND",
          reason: "privileged_routes_are_not_exposed_by_the_public_runtime",
        },
        404
      );
    }

    const pathname = url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");

    if (request.method !== "GET" && request.method !== "HEAD") {
      return json({ error: "METHOD_NOT_ALLOWED" }, 405, { Allow: "GET, HEAD" });
    }

    if (url.pathname !== pathname) {
      const redirectUrl = new URL(url.toString());
      redirectUrl.pathname = pathname;
      return Response.redirect(redirectUrl.toString(), 301);
    }

    const env = getEnv(rawEnv);
    const rendered = renderRoute(pathname, env);

    if (!rendered) {
      const body =
        '<!doctype html><html lang="en"><meta charset="utf-8"><title>Not Found</title><body><main><h1>404</h1><p>The requested page was not found.</p><p><a href="/">Return home</a></p></main></body></html>';
      return new Response(request.method === "HEAD" ? null : body, {
        status: 404,
        headers: securityHeaders("text/html; charset=UTF-8"),
      });
    }

    return new Response(request.method === "HEAD" ? null : rendered.body, {
      status: rendered.status ?? 200,
      headers: securityHeaders(rendered.contentType),
    });
  },
};

export default application;
