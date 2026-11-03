import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { createFileRoute } from "@tanstack/react-router";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function createPublishableFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    // New Supabase API keys are opaque strings, not bearer JWTs.
    if (headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

export const Route = createFileRoute("/api/public/property-images/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        if (!UUID.test(params.id)) return new Response("Not found", { status: 404 });

        const url = process.env["SUPABASE_URL"];
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
        if (!url || !key) return new Response("Storage is not configured", { status: 500 });

        const client = createClient<Database>(url, key, {
          global: { fetch: createPublishableFetch(key) },
          auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
        });

        const { data, error } = await client
          .from("admin_property_images")
          .select("mime_type, data")
          .eq("id", params.id)
          .maybeSingle();

        if (error || !data) return new Response("Not found", { status: 404 });

        // PostgREST returns bytea columns as base64 strings.
        const base64 = String(data.data);
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

        return new Response(bytes, {
          headers: {
            "Content-Type": data.mime_type || "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
