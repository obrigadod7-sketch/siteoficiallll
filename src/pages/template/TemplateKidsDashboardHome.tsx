import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TemplateKidsDashboardHome() {
  return (
    <div className="grid gap-6">
      <Card className="shadow-elev">
        <CardHeader>
          <CardTitle className="font-display uppercase tracking-[0.12em]">Visão geral (Demo)</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Painel de exemplo do ministério infantil. Substitua os cards abaixo por métricas reais no seu remix.
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Crianças cadastradas", value: "—" },
          { title: "Check-ins hoje", value: "—" },
          { title: "Eventos ativos", value: "—" },
        ].map((kpi) => (
          <Card key={kpi.title} className="shadow-elev">
            <CardHeader>
              <CardTitle className="font-display uppercase tracking-[0.12em]">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-foreground">{kpi.value}</p>
              <p className="mt-2 text-xs text-muted-foreground">Modo template (sem dados).</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
