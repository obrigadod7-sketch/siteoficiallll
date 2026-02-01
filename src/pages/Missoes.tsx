import { useEffect, useMemo, useState } from "react";

import paperTexture from "@/assets/texture-paper-fine.png";
import heroImage from "@/assets/bg-cultos-ao-vivo-user-treated-v2.jpg";
import africaKids1 from "@/assets/missoes-africa-criancas-01.jpeg";
import africaKids1Large from "@/assets/missoes-africa-criancas-01-1536.jpeg";
import africaTeam1 from "@/assets/missoes-africa-equipe-01.jpeg";
import africaKids2 from "@/assets/missoes-africa-criancas-02.jpeg";
import { ElementorHeader } from "@/components/site/ElementorHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useI18n } from "@/i18n/I18nProvider";

export default function Missoes() {
  const { t } = useI18n();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = `${t("missions_title")} | Missão Evangélica Lusitana`;
  }, [t]);

  const values = [
    t("missions_value_1"),
    t("missions_value_2"),
    t("missions_value_3"),
    t("missions_value_4"),
    t("missions_value_5"),
  ];

  const africaGallery = useMemo(
    () =>
      [
        {
          src: africaKids1,
          zoomSrc: africaKids1Large,
          alt: "Crianças reunidas em atividade comunitária durante a missão",
          // Prefer the larger file when available
          srcSet: `${africaKids1} 1024w, ${africaKids1Large} 1536w`,
        },
        {
          src: africaKids2,
          zoomSrc: africaKids2,
          alt: "Momento de comunhão com crianças durante uma ação da missão",
        },
        {
          src: africaTeam1,
          zoomSrc: africaTeam1,
          alt: "Equipe missionária durante apoio e serviço à comunidade",
        },
      ],
    [],
  );

  const lightboxImages = useMemo(() => africaGallery.map((g) => g.zoomSrc || g.src), [africaGallery]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ElementorHeader />

      <main>
        {/* HERO */}
        <header className="relative overflow-hidden">
          <div className="relative min-h-[440px] w-full md:min-h-[560px]">
            <img
              src={heroImage}
              alt="Pessoas reunidas em comunhão durante uma atividade da igreja"
              className="absolute inset-0 h-full w-full object-cover saturate-75 contrast-95 brightness-105 grayscale-[10%]"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />

            {/* overlay (identidade azul) */}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-mel-overlay/35 via-mel-overlay/35 to-mel-overlay/65" />

            {/* textura */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-20 mix-blend-soft-light"
              style={{ backgroundImage: `url(${paperTexture})`, backgroundRepeat: "repeat" }}
            />

            <div className="relative z-10 mx-auto w-full max-w-[1155px] px-6 py-16 md:py-20">
              <div className="max-w-[820px]">
                <p className="font-display text-[12px] font-semibold uppercase tracking-[0.35em] text-primary-foreground/90">
                  {t("missions_kicker")}
                </p>
                <h1 className="mt-4 font-display text-[40px] font-semibold uppercase tracking-[0.06em] text-primary-foreground md:text-[60px]">
                  {t("missions_title")}
                </h1>
                <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-primary-foreground/85 md:text-base">
                  {t("missions_subtitle")}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <Badge className="bg-card/85 text-foreground ring-1 ring-border backdrop-blur">{t("missions_badge_local")}</Badge>
                  <Badge className="bg-card/85 text-foreground ring-1 ring-border backdrop-blur">{t("missions_badge_global")}</Badge>
                  <Badge className="bg-card/85 text-foreground ring-1 ring-border backdrop-blur">{t("missions_badge_compassion")}</Badge>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="hero" size="xl">
                    <a href="#contribuir">{t("missions_cta_contribute")}</a>
                  </Button>
                  <Button asChild variant="outline" size="xl">
                    <a href="/cantina">{t("missions_cta_cantina")}</a>
                  </Button>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-primary-foreground/70">
                  {t("missions_disclaimer")}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* CONTEÚDO */}
        <section aria-label={t("missions_section_aria")} className="bg-background">
          <div className="mx-auto w-full max-w-[1155px] px-6 py-12 md:py-16">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-6 shadow-elev ring-1 ring-border">
                <h2 className="font-display text-[18px] uppercase tracking-[0.22em] text-foreground">{t("missions_why_title")}</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{t("missions_why_text")}</p>
              </Card>

              <Card className="p-6 shadow-elev ring-1 ring-border">
                <h2 className="font-display text-[18px] uppercase tracking-[0.22em] text-foreground">{t("missions_mission_title")}</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{t("missions_mission_text")}</p>
              </Card>

              <Card className="p-6 shadow-elev ring-1 ring-border">
                <h2 className="font-display text-[18px] uppercase tracking-[0.22em] text-foreground">{t("missions_values_title")}</h2>
                <ul className="mt-3 grid gap-2 text-[14px] leading-relaxed text-muted-foreground">
                  {values.map((v) => (
                    <li key={v} className="flex gap-3">
                      <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* CONTRIBUIR */}
        <section id="contribuir" aria-label={t("missions_contribute_aria")} className="bg-gradient-to-br from-mel-blueA to-mel-blueB p-px">
          <div className="bg-background">
            <div className="mx-auto w-full max-w-[1155px] px-6 py-12 md:py-16">
              <div className="max-w-[820px]">
                <h2 className="font-display text-[28px] font-semibold uppercase tracking-[0.12em] text-foreground md:text-[34px]">
                  {t("missions_contribute_title")}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{t("missions_contribute_text")}</p>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <Card className="p-6 shadow-elev ring-1 ring-border">
                  <h3 className="font-display text-[16px] uppercase tracking-[0.22em]">{t("missions_contribute_way_1_title")}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{t("missions_contribute_way_1_text")}</p>
                </Card>
                <Card className="p-6 shadow-elev ring-1 ring-border">
                  <h3 className="font-display text-[16px] uppercase tracking-[0.22em]">{t("missions_contribute_way_2_title")}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{t("missions_contribute_way_2_text")}</p>
                </Card>
                <Card className="p-6 shadow-elev ring-1 ring-border">
                  <h3 className="font-display text-[16px] uppercase tracking-[0.22em]">{t("missions_contribute_way_3_title")}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{t("missions_contribute_way_3_text")}</p>
                </Card>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="default" size="xl">
                  <a href="/#pastoral">{t("missions_cta_talk")}</a>
                </Button>
                <Button asChild variant="secondary" size="xl">
                  <a href="/cantina">{t("missions_cta_see_cantina")}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* MISSÃO CRIANÇAS NA ÁFRICA */}
        <section aria-label="Missão de Crianças na África" className="bg-background">
          <div className="mx-auto w-full max-w-[1155px] px-6 py-12 md:py-16">
            <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
              <div>
                <p className="font-display text-[12px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  Projeto em destaque
                </p>
                <h2 className="mt-3 font-display text-[28px] font-semibold uppercase tracking-[0.12em] text-foreground md:text-[34px]">
                  Ajude a missão com crianças na África
                </h2>
                <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                  Queremos apoiar crianças e famílias com presença, cuidado e ações práticas: ensino bíblico, material escolar,
                  alimentação, roupas e apoio às atividades locais. A sua ajuda (oração, doação ou voluntariado) faz diferença real.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge className="bg-card/85 text-foreground ring-1 ring-border backdrop-blur">Crianças</Badge>
                  <Badge className="bg-card/85 text-foreground ring-1 ring-border backdrop-blur">Educação</Badge>
                  <Badge className="bg-card/85 text-foreground ring-1 ring-border backdrop-blur">Assistência</Badge>
                  <Badge className="bg-card/85 text-foreground ring-1 ring-border backdrop-blur">Evangelização</Badge>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <Card className="p-5 shadow-elev ring-1 ring-border">
                    <h3 className="font-display text-[13px] uppercase tracking-[0.22em] text-foreground">Orar</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Ore por proteção, portas abertas e frutos duradouros.</p>
                  </Card>
                  <Card className="p-5 shadow-elev ring-1 ring-border">
                    <h3 className="font-display text-[13px] uppercase tracking-[0.22em] text-foreground">Contribuir</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Ajude com recursos para ações e necessidades locais.</p>
                  </Card>
                  <Card className="p-5 shadow-elev ring-1 ring-border">
                    <h3 className="font-display text-[13px] uppercase tracking-[0.22em] text-foreground">Servir</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Disponibilize-se: logística, comunicação ou viagens.</p>
                  </Card>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="hero" size="xl">
                    <a href="#contribuir">Quero ajudar agora</a>
                  </Button>
                  <Button asChild variant="outline" size="xl">
                    <a href="/#pastoral">Falar com a liderança</a>
                  </Button>
                </div>
              </div>

              <Card className="h-fit p-6 shadow-elev ring-1 ring-border">
                <h3 className="font-display text-[16px] uppercase tracking-[0.22em] text-foreground">Transparência</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Quer ver detalhes do projeto, necessidades atuais e como a ajuda é aplicada? Fale com a liderança e peça
                  relatórios/atualizações.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row md:flex-col">
                  <Button asChild variant="secondary">
                    <a href="/#pastoral">Pedir atualizações</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="#contribuir">Ver formas de contribuir</a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Galeria imersiva (imagens maiores) */}
          <div className="w-full bg-muted/20">
            <div className="mx-auto w-full max-w-[1400px] px-3 py-10 sm:px-6 md:py-14">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-[12px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                    Galeria
                  </p>
                  <h3 className="mt-2 font-display text-[18px] font-semibold uppercase tracking-[0.12em] text-foreground md:text-[20px]">
                    Veja de perto o impacto
                  </h3>
                </div>
                <p className="hidden text-xs text-muted-foreground md:block">Clique para ampliar</p>
              </div>

              <Carousel opts={{ align: "start" }} className="relative">
                <CarouselContent className="-ml-3">
                  {africaGallery.map((img, idx) => (
                    <CarouselItem key={img.alt} className="basis-full pl-3">
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        className="group relative block w-full overflow-hidden rounded-xl border border-border bg-background shadow-elev"
                        aria-label={`Abrir foto em zoom (${idx + 1})`}
                      >
                        <img
                          src={img.src}
                          srcSet={img.srcSet}
                          sizes="100vw"
                          alt={img.alt}
                          loading="lazy"
                          decoding="async"
                          className="h-[72vh] min-h-[420px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.01] md:min-h-[520px]"
                        />
                        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-sm font-semibold text-primary-foreground drop-shadow">{img.alt}</p>
                        </div>
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="left-3" />
                <CarouselNext className="right-3" />
              </Carousel>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => (!open ? setLightboxIndex(null) : null)}>
        <DialogContent className="max-w-[92vw] p-0 sm:max-w-[980px]">
          {lightboxIndex !== null ? (
            <div className="relative">
              <div className="grid max-h-[82vh] place-items-center bg-muted p-2">
                <img
                  src={lightboxImages[lightboxIndex]}
                  alt={africaGallery[lightboxIndex]?.alt ?? "Foto da missão"}
                  className="max-h-[80vh] w-auto max-w-[92vw] object-contain"
                  decoding="async"
                />
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-border bg-background p-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLightboxIndex((i) => (i === null ? null : (i - 1 + lightboxImages.length) % lightboxImages.length))}
                  disabled={lightboxImages.length <= 1}
                >
                  Anterior
                </Button>
                <p className="text-xs text-muted-foreground">
                  {lightboxIndex + 1} / {lightboxImages.length}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLightboxIndex((i) => (i === null ? null : (i + 1) % lightboxImages.length))}
                  disabled={lightboxImages.length <= 1}
                >
                  Próxima
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
