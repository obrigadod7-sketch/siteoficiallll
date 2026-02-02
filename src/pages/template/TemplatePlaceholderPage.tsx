import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TemplatePlaceholderPage({ title }: { title: string }) {
  return (
    <Card className="shadow-elev">
      <CardHeader>
        <CardTitle className="font-display uppercase tracking-[0.12em]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>
          Esta tela é um placeholder do <strong>template remixável</strong>.
        </p>
        <p>Substitua este conteúdo por componentes reais, dados do backend e regras de acesso no seu remix.</p>
      </CardContent>
    </Card>
  );
}
