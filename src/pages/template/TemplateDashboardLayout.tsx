import { Outlet } from "react-router-dom";

import { NavLink } from "@/components/NavLink";

const NavItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    end={to === "/dashboard"}
    className="rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground"
    activeClassName="bg-accent text-accent-foreground"
  >
    {label}
  </NavLink>
);

export default function TemplateDashboardLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto w-full max-w-[1250px] px-6 h-14 flex items-center justify-between">
          <div className="min-w-0">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Dashboard (Demo)
            </p>
          </div>

          <a
            className="rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground"
            href="/"
          >
            Voltar ao site
          </a>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1250px] px-6 py-6 flex-1">
        <div className="flex items-start gap-6">
          <aside className="hidden w-[260px] shrink-0 lg:block">
            <div className="sticky top-20 rounded-xl bg-card p-4 shadow-elev ring-1 ring-border">
              <nav className="grid gap-1">
                <NavItem to="/dashboard" label="Visão geral" />
                <NavItem to="/dashboard/membros" label="Membros" />
                <NavItem to="/dashboard/kids" label="Kids" />
                <NavItem to="/dashboard/aluno" label="Área do Aluno" />
                <NavItem to="/dashboard/assistant" label="Assistente" />
              </nav>
            </div>
          </aside>

          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
