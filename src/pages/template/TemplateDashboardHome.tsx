import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TemplateDashboardHome() {
  return (
    <div className="grid gap-6">
      <Card className="shadow-elev">
        <CardHeader>
          <CardTitle className="font-display uppercase tracking-[0.12em]">Template Remixável</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Este dashboard é <strong>demo</strong>: não exige login e não lê/escreve dados. Serve apenas como exemplo de layout
            para você remixar e adaptar.
          </p>
          <p>
            No seu projeto, você pode ligar autenticação, permissões e banco de dados—mantendo a mesma estrutura visual.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {[
          { title: "Membros (demo)", href: "/dashboard/membros", text: "Exemplo de área administrativa." },
          { title: "Kids (demo)", href: "/dashboard/kids", text: "Exemplo de painel do ministério infantil." },
          { title: "Área do Aluno (demo)", href: "/dashboard/aluno", text: "Estrutura pronta para conteúdos." },
          { title: "Assistente (demo)", href: "/dashboard/assistant", text: "Exemplo de ferramenta interna." },
        ].map((item) => (
          <Card key={item.href} className="shadow-elev">
            <CardHeader>
              <CardTitle className="font-display uppercase tracking-[0.12em]">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{item.text}</p>
              <a
                href={item.href}
                className="inline-flex rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Abrir
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
