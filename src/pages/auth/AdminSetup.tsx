import { ElementorHeader } from "@/components/site/ElementorHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { AdminBootstrapForm } from "@/components/auth/AdminBootstrapForm";
import { CreateAdminForm } from "@/components/auth/CreateAdminForm";
import { useSession } from "@/hooks/useSession";
import { useIsAdmin } from "@/hooks/use-is-admin";

export default function AdminSetup() {
  const { loading, userId } = useSession();
  const isAdminQ = useIsAdmin();
  const isAdmin = Boolean(isAdminQ.data);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ElementorHeader />

      <main className="flex-1">
        {/* 1) Fluxo para criar o primeiro admin (sem login) */}
        {!loading && !userId ? <AdminBootstrapForm /> : null}

        {/* 2) Fluxo para criar NOVOS admins (somente admin logado) */}
        {!loading && userId ? (isAdmin ? <CreateAdminForm /> : null) : null}

        {/* Mensagens de orientação */}
        {!loading && userId && !isAdmin ? (
          <section className="mx-auto w-full max-w-[560px] px-6 pb-12">
            <div className="rounded-md border border-border bg-card p-4 text-sm text-muted-foreground">
              Você está logado, mas não tem permissão de <strong>admin</strong> para criar novos administradores.
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}

