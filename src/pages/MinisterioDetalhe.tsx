import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ElementorHeader } from "@/components/site/ElementorHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { getMinisterioBySlug, MINISTERIO_SOCIALS } from "@/shared/ministerios";
import CasaisMinisterio from "@/pages/CasaisMinisterio";
import { useI18n } from "@/i18n/I18nProvider";
import { KidsSignupForm } from "@/components/site/KidsSignupForm";
import responsavelInfantil from "@/assets/responsavel-ministerio-infantil-cutout.png";
import bannerMinisterioInfantilMelhorado from "@/assets/banner-ministerio-infantil-melhorado.jpg";
import bannerMinisterioInfantilMelhorado2x from "@/assets/banner-ministerio-infantil-melhorado-2x.jpg";
import texturePaperFine from "@/assets/texture-paper-fine.png";

import infantilExtra01 from "@/assets/infantil-extra-01.jpg";
import infantilExtra02 from "@/assets/infantil-extra-02.jpg";
import infantilExtra03 from "@/assets/infantil-extra-03.jpg";
import infantilExtra04 from "@/assets/infantil-extra-04.jpg";
import infantilExtra05 from "@/assets/infantil-extra-05.jpg";
import infantilExtra06 from "@/assets/infantil-extra-06.jpg";
import infantilExtra07 from "@/assets/infantil-extra-07.jpg";

function BulletList({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="ml-4 list-disc space-y-2 text-sm text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function hashString(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export default function MinisterioDetalhe() {
  const { slug } = useParams();
  const ministerio = getMinisterioBySlug(slug || "");
  const isCasais = ministerio?.slug === "ministerio-de-casais";
  const isInfantil = ministerio?.slug === "ministerio-infantil";
  const { t } = useI18n();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const infantil = isInfantil
    ? {
        titulo: t("kids_title"),
        subtitulo: t("kids_subtitle"),
        descricao: t("kids_about_text"),
        missao: t("kids_mission_text"),
        valores: [
          t("kids_value_1"),
          t("kids_value_2"),
          t("kids_value_3"),
          t("kids_value_4"),
        ],
        atividades: [t("kids_activity_1"), t("kids_activity_2"), t("kids_activity_3")],
        comoParticipar: t("kids_how_text"),
        lideranca: [
          { role: t("kids_leader_1_role"), name: t("kids_leader_1_name") },
          { role: t("kids_leader_2_role"), name: t("kids_leader_2_name") },
        ],
      }
    : null;

  if (ministerio && isCasais) {
    return <CasaisMinisterio ministerio={ministerio} />;
  }

  const isAdminQuery = useIsAdmin();

  const mediaQuery = useQuery({
    queryKey: ["ministryMediaCache", ministerio?.slug],
    enabled: !!ministerio?.slug,
    queryFn: async () => {
      if (!ministerio) return { images: [] as string[] };

      // Read cache from backend (no scraping on page view)
      const { data, error } = await supabase.functions.invoke("ministry-media", {
        body: {
          action: "get",
          slug: ministerio.slug,
        },
      });
      if (error) throw error;
      return data as { success: boolean; images?: string[] };
    },
    staleTime: 1000 * 60 * 10,
  });

  const scrapedImages = (mediaQuery.data?.images || []).filter(Boolean);
  const galleryImages = (ministerio?.galeria || []).filter(Boolean);
  const pickedHero =
    scrapedImages.length > 0 && ministerio
      ? scrapedImages[hashString(ministerio.slug) % scrapedImages.length]
      : undefined;
  const heroSrc = isInfantil ? bannerMinisterioInfantilMelhorado : pickedHero || ministerio.imagem;

  const infantilExtraImages = useMemo(() => {
    if (!isInfantil) return [] as string[];
    return [
      infantilExtra01,
      infantilExtra02,
      infantilExtra03,
      infantilExtra04,
      infantilExtra05,
      infantilExtra06,
      infantilExtra07,
    ].filter(Boolean);
  }, [isInfantil]);

  const lightboxImages = useMemo(
    () => (isInfantil ? [...infantilExtraImages, ...galleryImages] : galleryImages),
    [galleryImages, infantilExtraImages, isInfantil],
  );

  if (!ministerio) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <ElementorHeader />
        <main>
          <section className="mx-auto w-full max-w-[1100px] px-6">
            <h1 className="font-display text-2xl uppercase tracking-[0.14em]">Ministério não encontrado</h1>
            <p className="mt-2 text-muted-foreground">Verifique o link e tente novamente.</p>
            <div className="mt-6">
              <Button asChild variant="default">
                <Link to="/ministerios">Voltar para Ministérios</Link>
              </Button>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ElementorHeader />

      <main>
        <section
          className={
            "relative " +
            (isCasais
              ? "min-h-[360px] md:min-h-[440px]"
              : isInfantil
                ? "min-h-[360px] sm:min-h-[440px] lg:min-h-[560px]"
                : "")
          }
        >
          <div className="absolute inset-0">
            {isInfantil ? (
              <picture>
                <source
                  media="(max-width: 639px)"
                  srcSet={`${bannerMinisterioInfantilMelhorado} 1x, ${bannerMinisterioInfantilMelhorado2x} 2x`}
                />
                <source
                  media="(max-width: 1023px)"
                  srcSet={`${bannerMinisterioInfantilMelhorado} 1x, ${bannerMinisterioInfantilMelhorado2x} 2x`}
                />
                <source srcSet={`${bannerMinisterioInfantilMelhorado} 1x, ${bannerMinisterioInfantilMelhorado2x} 2x`} />
                <img
                  src={bannerMinisterioInfantilMelhorado}
                  alt={`Imagem do ministério ${ministerio.titulo}`}
                  className={
                    // Mais brilho/vida no banner (sem alterar a paleta do site)
                    "h-full w-full brightness-[1.08] contrast-[1.04] saturate-[1.06] " +
                    // Preenche mais a tela (pode cortar um pouco) conforme solicitado
                    "object-cover"
                  }
                  // Banner é a imagem mais importante da página
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
            ) : (
              <img
                src={heroSrc}
                alt={`Imagem do ministério ${ministerio.titulo}`}
                className={
                  "h-full w-full " +
                  (isCasais ? "object-contain bg-muted" : "object-cover")
                }
                loading="lazy"
              />
            )}

             {/* Textura (somente Infantil): camada sutil para igualar o acabamento da referência sem mexer na imagem/rostos */}
             {isInfantil && (
               <div
                 aria-hidden
                 className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
                 style={{
                   backgroundImage: `url(${texturePaperFine})`,
                   backgroundRepeat: "repeat",
                   // Maior e mais suave para evitar padrão repetitivo evidente
                   backgroundSize: "1200px 1200px",
                   backgroundPosition: "center",
                   // Ajustes apenas na textura (não altera os rostos/cores da foto)
                   filter: "contrast(1.18) brightness(0.96)",
                 }}
               />
             )}

            <div
              className={
                "absolute inset-0 bg-gradient-to-b " +
                (isInfantil
                  ? "from-background/0 via-background/25 to-background"
                  : "from-background/10 via-background/65 to-background")
              }
            />
          </div>

          <div className="relative mx-auto w-full max-w-[1100px] px-6 py-14 md:py-20">
            <Badge variant="secondary">Ministério</Badge>
            <h1 className="mt-3 font-display text-3xl uppercase tracking-[0.14em] md:text-5xl">
              {infantil?.titulo ?? ministerio.titulo}
            </h1>

            {(ministerio.subtitulo || ministerio.resumo) && (
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {infantil?.subtitulo ?? ministerio.subtitulo ?? ministerio.resumo}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {Boolean(isAdminQuery.data) && ministerio && (
                <Button
                  variant="secondary"
                  disabled={mediaQuery.isFetching}
                  onClick={async () => {
                    try {
                      const { data, error } = await supabase.functions.invoke("ministry-media", {
                        body: {
                          action: "refresh",
                          slug: ministerio.slug,
                          title: ministerio.titulo,
                          sources: {
                            facebook: MINISTERIO_SOCIALS.facebook,
                            instagram: MINISTERIO_SOCIALS.instagram,
                          },
                          limit: 24,
                        },
                      });

                      if (error || !data?.success) {
                        throw new Error(data?.error || error?.message || "Falha ao atualizar imagens");
                      }

                      toast({ title: "Imagens atualizadas", description: "Cache atualizado com sucesso." });
                      await mediaQuery.refetch();
                    } catch (e) {
                      const msg = e instanceof Error ? e.message : "Falha ao atualizar imagens";
                      toast({ title: "Erro", description: msg, variant: "destructive" });
                    }
                  }}
                >
                  Atualizar imagens
                </Button>
              )}

              {ministerio.ctaLabel && (
                <Button asChild variant="default">
                  <a href={MINISTERIO_SOCIALS.facebook} target="_blank" rel="noreferrer">
                    {ministerio.ctaLabel}
                  </a>
                </Button>
              )}

              {/* Remove redes sociais do banner do Ministério Infantil (mantém para os outros) */}
              {!isInfantil && (
                <>
                  <Button asChild variant="outline">
                    <a href={MINISTERIO_SOCIALS.facebook} target="_blank" rel="noreferrer">
                      Facebook
                    </a>
                  </Button>

                  <Button asChild variant="outline">
                    <a href={MINISTERIO_SOCIALS.instagram} target="_blank" rel="noreferrer">
                      Instagram
                    </a>
                  </Button>

                  <Button asChild variant="outline">
                    <a href={MINISTERIO_SOCIALS.youtube} target="_blank" rel="noreferrer">
                      YouTube
                    </a>
                  </Button>
                </>
              )}

              <Button asChild variant="ghost">
                <Link to="/ministerios">Voltar</Link>
              </Button>
            </div>
          </div>
        </section>

        {galleryImages.length > 0 && (
          <section className="mx-auto w-full max-w-[1100px] px-6 pt-10">
            <Card>
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-[0.12em]">Galeria</CardTitle>
              </CardHeader>
              <CardContent>
                <Carousel opts={{ align: "start", dragFree: true }} className="relative">
                  <CarouselContent className="-ml-3">
                    {galleryImages.map((src, idx) => (
                      <CarouselItem
                        key={src}
                        className="basis-[92%] pl-3 sm:basis-[64%] md:basis-[44%] lg:basis-[34%]"
                      >
                        <button
                          type="button"
                          className="group relative block w-full overflow-hidden rounded-md border border-border bg-muted/60"
                          onClick={() => setLightboxIndex((isInfantil ? infantilExtraImages.length : 0) + idx)}
                          aria-label="Abrir imagem em zoom"
                        >
                          <img
                            src={src}
                            alt={`Foto do ministério ${ministerio.titulo}`}
                            className="aspect-square h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="-left-4 hidden md:inline-flex" />
                  <CarouselNext className="-right-4 hidden md:inline-flex" />
                </Carousel>
              </CardContent>
            </Card>
          </section>
        )}

        <section className="mx-auto w-full max-w-[1100px] px-6 pb-16">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-[0.12em]">
                  {isInfantil ? t("kids_about_title") : "Sobre"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{infantil?.descricao ?? ministerio.descricao}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-[0.12em]">
                  {isInfantil ? t("kids_mission_values_title") : "Missão e valores"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(infantil?.missao ?? ministerio.missao) && (
                  <p className="text-sm text-muted-foreground">{infantil?.missao ?? ministerio.missao}</p>
                )}
                <div className="mt-4">
                  <BulletList items={infantil?.valores ?? ministerio.valores} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-[0.12em]">
                  {isInfantil ? t("kids_activities_title") : "Atividades"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BulletList items={infantil?.atividades ?? ministerio.atividades} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display uppercase tracking-[0.12em]">
                  {isInfantil ? t("kids_how_title") : "Como participar"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {infantil?.comoParticipar ||
                    ministerio.comoParticipar ||
                    "Fale com a liderança após o culto ou envie uma mensagem pelas redes sociais para receber orientações."}
                </p>
              </CardContent>
            </Card>

            {isInfantil && infantil && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="font-display uppercase tracking-[0.12em]">{t("kids_leadership_title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {infantil.lideranca.map((l) => (
                      <div key={`${l.role}-${l.name}`} className="rounded-md border border-border bg-card p-4">
                        <p className="text-sm font-semibold text-foreground">{l.role}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{l.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {isInfantil ? (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="font-display uppercase tracking-[0.12em]">{t("kids_signup_title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">{t("kids_signup_subtitle")}</p>
                  <KidsSignupForm />
                </CardContent>
              </Card>
            ) : null}
          </div>

          {ministerio.versiculo && (
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display uppercase tracking-[0.12em]">Versículo bíblico</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm italic text-muted-foreground">“{ministerio.versiculo.texto}”</p>
                  <p className="mt-2 text-sm font-semibold text-foreground">{ministerio.versiculo.referencia}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {isInfantil && (
            <div className="mt-6">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid items-center gap-6 md:grid-cols-[320px_1fr]">
                    <div className="rounded-md border border-border bg-muted/60 p-4">
                      <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-sm">
                        <div className="aspect-square w-full overflow-hidden">
                          <img
                            src={responsavelInfantil}
                            alt="Responsável pelo Ministério Infantil"
                            // Quadrado + zoom para destacar o rosto/parte superior
                            className="h-full w-full scale-[1.44] object-cover object-[50%_46%]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-display text-xl uppercase tracking-[0.12em] md:text-2xl">
                        Responsável pelo Ministério Infantil
                      </h2>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Com amor e dedicação, cuidamos das crianças durante os cultos e atividades,
                        ensinando a Palavra de forma acessível e segura, fortalecendo valores cristãos e
                        apoiando as famílias no discipulado.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {isInfantil && infantilExtraImages.length > 0 && (
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display uppercase tracking-[0.12em]">Momentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Carousel opts={{ align: "start", dragFree: true }} className="relative">
                    <CarouselContent className="-ml-3">
                      {infantilExtraImages.map((src, idx) => (
                        <CarouselItem
                          key={`${src}-${idx}`}
                          className="basis-[92%] pl-3 sm:basis-[64%] md:basis-[44%] lg:basis-[34%]"
                        >
                          <button
                            type="button"
                            className="group relative block w-full overflow-hidden rounded-md border border-border bg-muted/60"
                            onClick={() => setLightboxIndex(idx)}
                            aria-label="Abrir imagem em zoom"
                          >
                            <img
                              src={src}
                              alt={`Foto do Ministério Infantil (${idx + 1})`}
                              className="aspect-square h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                              loading="lazy"
                              decoding="async"
                            />
                          </button>
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    <CarouselPrevious className="-left-4 hidden md:inline-flex" />
                    <CarouselNext className="-right-4 hidden md:inline-flex" />
                  </Carousel>
                </CardContent>
              </Card>
            </div>
          )}

          {galleryImages.length > 0 && <div className="mt-6" />}

          {scrapedImages.length > 0 && (
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display uppercase tracking-[0.12em]">Imagens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {scrapedImages.slice(0, 6).map((src) => (
                      <div key={src} className="relative overflow-hidden rounded-md border border-border">
                        <img
                          src={src}
                          alt={`Foto do ministério ${ministerio.titulo}`}
                          className="aspect-[4/3] h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </section>

        <Dialog open={lightboxIndex !== null} onOpenChange={(open) => (!open ? setLightboxIndex(null) : null)}>
          <DialogContent className="max-w-[92vw] p-0 sm:max-w-[860px]">
            {lightboxIndex !== null && (
              <div className="relative">
                <div className="grid max-h-[82vh] place-items-center bg-muted p-2">
                  <img
                    src={lightboxImages[lightboxIndex]}
                    alt={`Foto do ministério ${ministerio.titulo}`}
                    className="max-h-[80vh] w-auto max-w-[92vw] object-contain"
                    decoding="async"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-border bg-background p-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setLightboxIndex((i) =>
                        i === null ? null : (i - 1 + lightboxImages.length) % lightboxImages.length
                      )
                    }
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
            )}
          </DialogContent>
        </Dialog>
      </main>

      <SiteFooter />
    </div>
  );
}
