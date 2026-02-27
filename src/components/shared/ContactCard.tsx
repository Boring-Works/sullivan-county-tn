import { Clock, Mail, MapPin, Phone, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { ContactInfo } from "~/data/departments";

interface ContactCardProps {
  head: { name: string; title: string };
  contact: ContactInfo;
}

export function ContactCard({ head, contact }: ContactCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-brand-blue">{head.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{head.title}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        <div className="flex items-start gap-2">
          <Phone className="mt-0.5 size-4 shrink-0 text-brand-blue" />
          <a href={`tel:${contact.phone}`} className="hover:text-brand-blue hover:underline">
            {contact.phone}
          </a>
        </div>

        {contact.fax && (
          <div className="flex items-start gap-2">
            <Printer className="mt-0.5 size-4 shrink-0 text-brand-blue" />
            <span>{contact.fax}</span>
          </div>
        )}

        {contact.email && (
          <div className="flex items-start gap-2">
            <Mail className="mt-0.5 size-4 shrink-0 text-brand-blue" />
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-brand-blue hover:underline break-all"
            >
              {contact.email}
            </a>
          </div>
        )}

        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand-blue" />
          <span>{contact.address}</span>
        </div>

        <div className="flex items-start gap-2">
          <Clock className="mt-0.5 size-4 shrink-0 text-brand-blue" />
          <span>{contact.hours}</span>
        </div>
      </CardContent>
    </Card>
  );
}
