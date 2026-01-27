const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type Ok = { success: true; userId: string };
type Fail = { success: false; error: string };

function json(data: Ok | Fail, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function isValidEmail(email: string) {
  // Simple validation; frontend also validates with zod.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) {
      return json({ success: false, error: "unauthorized" }, 401);
    }

    const body = await req.json().catch(() => ({}));
    const email = String(body?.email || "")
      .trim()
      .toLowerCase();
    const password = String(body?.password || "");

    if (!email || !isValidEmail(email) || email.length > 255) {
      return json({ success: false, error: "invalid_email" }, 400);
    }
    // Supabase recommended max is 72 bytes for bcrypt; keep aligned with frontend.
    if (!password || password.length < 8 || password.length > 72) {
      return json({ success: false, error: "invalid_password" }, 400);
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
      return json({ success: false, error: "backend_not_configured" }, 500);
    }

    // 1) Validate caller and check role using caller's JWT.
    const callerClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const {
      data: { user },
    } = await callerClient.auth.getUser();
    if (!user) return json({ success: false, error: "unauthorized" }, 401);

    const { data: isAdmin, error: roleErr } = await callerClient.rpc("has_role", {
      _user_id: user.id,
      _role: "admin",
    });
    if (roleErr) return json({ success: false, error: "failed_to_check_role" }, 500);
    if (!isAdmin) return json({ success: false, error: "forbidden" }, 403);

    // 2) Create user and assign admin role using service role.
    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (createErr || !created?.user?.id) {
      return json({ success: false, error: createErr?.message || "failed_to_create_user" }, 400);
    }

    const userId = created.user.id;

    const { error: roleAssignErr } = await admin.from("user_roles").insert({ user_id: userId, role: "admin" });
    if (roleAssignErr) {
      return json({ success: false, error: "failed_to_assign_role" }, 500);
    }

    // Best-effort: profile row
    await admin.from("profiles").insert({ user_id: userId, display_name: "Admin" });

    return json({ success: true, userId }, 200);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "create_admin_failed";
    console.error("create-admin error:", msg);
    return json({ success: false, error: msg }, 500);
  }
});
