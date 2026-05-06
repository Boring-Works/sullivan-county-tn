import { Phone } from "lucide-react";
import { cn } from "~/lib/utils";

interface TelLinkProps {
  phone: string;
  className?: string;
  showIcon?: boolean;
  iconClassName?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
}

function normalize(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  // Short codes (911, 311, 211, 7-digit local) — no country prefix; tel: dials as-is.
  if (digits.length <= 7) return digits;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

export function TelLink({
  phone,
  className,
  showIcon = false,
  iconClassName,
  children,
  ariaLabel,
}: TelLinkProps) {
  const href = `tel:${normalize(phone)}`;
  return (
    <a
      href={href}
      className={cn("transition-colors hover:text-brand-copper", className)}
      aria-label={ariaLabel ?? `Call ${phone}`}
    >
      {showIcon && (
        <Phone aria-hidden="true" className={cn("inline-block size-4 mr-1.5", iconClassName)} />
      )}
      {children ?? phone}
    </a>
  );
}
