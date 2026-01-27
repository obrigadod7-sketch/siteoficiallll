import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "@/integrations/supabase/client";
import { ElementorHeader } from "@/components/site/ElementorHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type Values = {
  email: string;
};

export default function ForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const schema = useMemo(
    () =>
      z.object({
        email: z.string().trim().email("Email inválido"),
      }),
    [],
  );

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ElementorHeader />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-[520px] px-6 py-12">
          <h1 className="font-display text-3xl uppercase tracking-[0.14em]">Recuperar senha</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Informe seu e-mail. Você receberá um link para definir uma nova senha.
          </p>

          <Card className="mt-8 p-6 shadow-elev ring-1 ring-border">
            <form
              className="grid gap-4"
              onSubmit={form.handleSubmit(async (values) => {
                setSubmitting(true);
                try {
                  const redirectTo = `${window.location.origin}/reset-password`;
                  const { error } = await supabase.auth.resetPasswordForEmail(values.email, { redirectTo });
                  if (error) throw error;

                  toast({
                    title: "Email enviado!",
                    description: "Verifique sua caixa de entrada (e spam).",
                  });
                } catch (e: any) {
                  toast({
                    title: "Não foi possível enviar",
                    description: e?.message ?? "Tente novamente.",
                    variant: "destructive",
                  });
                } finally {
                  setSubmitting(false);
                }
              })}
            >
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
                {form.formState.errors.email ? (
                  <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                ) : null}
              </div>

              <Button type="submit" disabled={submitting}>
                {submitting ? "Enviando..." : "Enviar link"}
              </Button>

              <Button type="button" variant="secondary" onClick={() => navigate("/login")}
              >
                Voltar ao login
              </Button>
            </form>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
