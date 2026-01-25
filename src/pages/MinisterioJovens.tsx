import { useEffect } from "react";
import { Link } from "react-router-dom";

import { ElementorHeader } from "@/components/site/ElementorHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Imagem provisória (vou trocar pela sua assim que você enviar)
import heroPlaceholder from "@/assets/hero-oficial-2-1.png";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="ml-4 list-disc space-y-2 text-sm text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function MinisterioJovens() {
  useEffect(() => {
    document.title = "Ministério dos Jovens | Missão Evangélica Lusitana";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ElementorHeader />

      <main>
        {/* HERO */}
        <header className="relative min-h-[320px] sm:min-h-[420px]">
          <div className="absolute inset-0">
            <img
              src={heroPlaceholder}
              alt="Encontro do Ministério dos Jovens"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/55 to-background" />
          </div>

          <div className="relative mx-auto w-full max-w-[1100px] px-6 py-14 md:py-20">
            <Badge variant="secondary">Ministério</Badge>
            <h1 className="mt-3 font-display text-3xl uppercase tracking-[0.14em] md:text-5xl">
              Ministério dos Jovens
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Um espaço para crescer na Palavra, construir amizades saudáveis e servir a Deus com alegria.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild variant="default">
                <a href="#como-participar">Como participar</a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/ministerios">Ver outros ministérios</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* CONTEÚDO */}
        <section className="mx-auto w-full max-w-[1100px] px-6 py-10 md:py-14">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-[0.12em]">Sobre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  O Ministério dos Jovens existe para fortalecer a fé da nova geração, promover comunhão e preparar
                  discípulos comprometidos com Cristo, vivendo o Evangelho no dia a dia.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-[0.12em]">Missão e valores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Caminhar juntos em direção a Jesus, com ensino bíblico, cuidado pastoral e serviço.
                </p>
                <BulletList
                  items={[
                    "Cristo no centro",
                    "Comunhão e amizade",
                    "Santidade e propósito",
                    "Serviço e missão",
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-[0.12em]">Atividades</CardTitle>
              </CardHeader>
              <CardContent>
                <BulletList
                  items={[
                    "Encontros semanais com louvor, Palavra e comunhão",
                    "Pequenos grupos e discipulado",
                    "Ações sociais e evangelismo",
                    "Momentos de oração e consagração",
                  ]}
                />
              </CardContent>
            </Card>

            <Card id="como-participar" className="scroll-mt-28">
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-[0.12em]">Como participar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Você pode participar chegando em um dos nossos encontros e falando com a liderança ao final.
                  Se preferir, peça orientação na igreja após o culto para receber dias/horários e entrar no grupo.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-[0.12em]">Versículo bíblico</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground">“Ninguém despreze a tua mocidade...”</p>
                <p className="mt-2 text-sm font-semibold text-foreground">1 Timóteo 4:12</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
