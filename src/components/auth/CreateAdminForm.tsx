import { useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type Values = {
  email: string;
  password: string;
};

export function CreateAdminForm() {
  const [submitting, setSubmitting] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
        password: z.string().min(8, "Mínimo 8 caracteres").max(72, "Senha muito longa"),
      }),
    [],
  );

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <section className="mx-auto w-full max-w-[560px] px-6 pb-12">
      <h2 className="font-display text-2xl uppercase tracking-[0.14em]">Criar novo administrador</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Cria um novo usuário já com papel <strong>admin</strong>. A senha é definida aqui (não depende de email).
      </p>

      <Card className="mt-6 p-6 shadow-elev ring-1 ring-border">
        <form
          className="grid gap-4"
          onSubmit={form.handleSubmit(async (values) => {
            setSubmitting(true);
            try {
              const { data, error } = await supabase.functions.invoke("create-admin", {
                body: { email: values.email, password: values.password },
              });
              if (error) throw error;
              if (!data?.success) throw new Error(String((data as any)?.error || "Falha ao criar admin"));

              toast({ title: "Admin criado!" });
              form.reset({ email: "", password: "" });
            } catch (e: any) {
              toast({
                title: "Não foi possível criar",
                description: e?.message ?? "Tente novamente.",
                variant: "destructive",
              });
            } finally {
              setSubmitting(false);
            }
          })}
        >
          <div className="grid gap-2">
            <Label htmlFor="new-admin-email">E-mail</Label>
            <Input id="new-admin-email" type="email" autoComplete="email" {...form.register("email")} />
            {form.formState.errors.email ? (
              <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-admin-password">Senha</Label>
            <Input id="new-admin-password" type="password" autoComplete="new-password" {...form.register("password")} />
            {form.formState.errors.password ? (
              <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
            ) : null}
          </div>

          <Button type="submit" disabled={submitting}>
            {submitting ? "Criando..." : "Criar novo admin"}
          </Button>
        </form>
      </Card>
    </section>
  );
}
