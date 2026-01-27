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
        // For recovery/magic links, the auth server may redirect with:
        // - ?code=... (PKCE) OR
        // - tokens in the URL hash (#access_token=...)
        // We must NOT redirect away before the client finishes persisting the session.
        const url = window.location.href;
        const hasCode = new URL(url).searchParams.get("code");

        if (hasCode) {
          const { error } = await supabase.auth.exchangeCodeForSession(url);
          if (error) throw error;
        }

        // Wait for session to be available (covers hash-token flows + race conditions)
        const waitForSession = async (timeoutMs = 7000) => {
          const started = Date.now();

          const { data: initial } = await supabase.auth.getSession();
          if (initial.session) return initial.session;

          return await new Promise<NonNullable<typeof initial.session>>((resolve, reject) => {
            const timer = window.setInterval(async () => {
              try {
                const { data } = await supabase.auth.getSession();
                if (data.session) {
                  cleanup();
                  resolve(data.session);
                  return;
                }
                if (Date.now() - started > timeoutMs) {
                  cleanup();
                  reject(new Error("Sessão não encontrada"));
                }
              } catch (err) {
                cleanup();
                reject(err);
              }
            }, 300);

            const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
              if (session) {
                cleanup();
                resolve(session);
              }
            });

            const cleanup = () => {
              window.clearInterval(timer);
              sub.subscription.unsubscribe();
            };
          });
        };

        await waitForSession();

        if (!mounted) return;
        navigate("/reset-password", { replace: true });
      } catch (e: any) {
        if (!mounted) return;
        toast({
          title: "Link inválido ou expirado",
          description:
            e?.message ?? "Não conseguimos validar sua sessão. Tente solicitar um novo link e abra no mesmo navegador.",
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
