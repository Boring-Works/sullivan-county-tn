import { FileDown } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { NewsItem } from "~/data/news";

interface NewsCardProps {
  item: NewsItem;
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue hover:text-brand-blue-light hover:underline"
            >
              {item.title}
            </a>
          ) : (
            <span className="text-brand-blue">{item.title}</span>
          )}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {formatDate(item.date)} &middot; {item.author}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed">{item.summary}</p>
        {item.pdfUrl && (
          <div>
            <Badge asChild variant="secondary">
              <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
                <FileDown className="size-3" />
                Download PDF
              </a>
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
