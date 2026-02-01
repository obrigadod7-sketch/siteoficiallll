import pastorPresidente from "@/assets/pastor-presidente.jpg";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Pastor = {
  name: string;
  role: string;
  location?: string;
  imageSrc: string;
  /**
   * Ajuste fino do recorte do rosto.
   * Ex.: "50% 20%" (x y)
   */
  objectPosition?: string;
};

const PASTORS: Pastor[] = [
  {
    name: "Pr. Ivaldo Luiz Conceição",
    role: "Pastor Presidente",
    location: "Missão Lusitana — Sintra",
    imageSrc: pastorPresidente,
    objectPosition: "40% 18%",
  },
];

export function PastorsCarousel() {
  return (
    <section aria-label="Mural de pastores" className="mx-auto w-full max-w-[900px]">
      <Carousel opts={{ align: "start" }} className="relative">
        <CarouselContent className="-ml-3">
          {PASTORS.map((p) => (
            <CarouselItem
              key={p.name}
              className="basis-[88%] pl-3 sm:basis-[60%] lg:basis-[44%]"
            >
              <Card className="shadow-elev">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-1 ring-border">
                      <img
                        src={p.imageSrc}
                        alt={`${p.name} — ${p.role}`}
                        className="h-full w-full object-cover"
                        style={{ objectPosition: p.objectPosition ?? "50% 50%" }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="min-w-0 text-left">
                      <p className="font-display text-xs uppercase tracking-[0.18em]">{p.role}</p>
                      <p className="mt-1 font-display text-base">{p.name}</p>
                      {p.location ? (
                        <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious aria-label="Anterior" className="-left-3" />
        <CarouselNext aria-label="Próximo" className="-right-3" />
      </Carousel>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Envie mais fotos dos pastores que eu adiciono aqui no mural.
      </p>
    </section>
  );
}
