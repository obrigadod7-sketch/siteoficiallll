import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        // For recovery/magic links, Supabase may redirect with a ?code=... (PKCE)
        // or with tokens in the URL hash. exchangeCodeForSession handles the PKCE code flow.
        const url = window.location.href;
        const hasCode = new URL(url).searchParams.get("code");
        if (hasCode) {
          const { error } = await supabase.auth.exchangeCodeForSession(url);
          if (error) throw error;
        }

        // After session is established, send user to reset password UI.
        if (!mounted) return;
        navigate("/reset-password", { replace: true });
      } catch (e: any) {
        if (!mounted) return;
        toast({
          title: "Link inválido ou expirado",
          description: e?.message ?? "Tente solicitar um novo link.",
          variant: "destructive",
        });
        navigate("/login", { replace: true });
      }
    })();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <p className="text-sm text-muted-foreground">Validando link…</p>
    </div>
  );
}
