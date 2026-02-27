import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Commissioner } from "~/data/commissioners";

interface CommissionerCardProps {
  commissioner: Commissioner;
}

export function CommissionerCard({ commissioner }: CommissionerCardProps) {
  return (
    <Card className="py-4">
      <CardHeader className="gap-1 pb-0">
        <CardTitle className="text-base text-brand-blue">{commissioner.name}</CardTitle>
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 size-3.5 shrink-0" />
          <span>{commissioner.address}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        {commissioner.phone && (
          <div className="flex items-center gap-2">
            <Phone className="size-3.5 shrink-0 text-brand-blue" />
            <a href={`tel:${commissioner.phone}`} className="hover:text-brand-blue hover:underline">
              {commissioner.phone}
            </a>
          </div>
        )}
        {commissioner.email && (
          <div className="flex items-center gap-2">
            <Mail className="size-3.5 shrink-0 text-brand-blue" />
            <a
              href={`mailto:${commissioner.email}`}
              className="break-all hover:text-brand-blue hover:underline"
            >
              {commissioner.email}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
