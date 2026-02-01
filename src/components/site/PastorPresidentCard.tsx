import pastorPresidente from "@/assets/pastor-presidente.jpg";
import { Card, CardContent } from "@/components/ui/card";

type PastorPresidentCardProps = {
  className?: string;
};

export function PastorPresidentCard({ className }: PastorPresidentCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <img
            src={pastorPresidente}
            alt="Pr. Ivaldo Luiz Conceição, Pastor Presidente da Missão Lusitana"
            className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-border"
            loading="lazy"
          />

          <div className="min-w-0">
            <p className="font-display text-sm uppercase tracking-[0.14em]">Pastor Presidente</p>
            <p className="mt-1 font-display text-base">Pr. Ivaldo Luiz Conceição</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Pastor Presidente da Federação Missão Evangélica Lusitana (Missão Lusitana) — Sintra.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
