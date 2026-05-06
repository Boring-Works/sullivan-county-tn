/**
 * Build a minimal vCard 3.0 string. Caller is responsible for URL-encoding.
 */
export function buildVCard(input: {
  fullName: string;
  title?: string;
  organization?: string;
  phone?: string;
  email?: string;
  address?: string;
  url?: string;
  note?: string;
}): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeText(input.fullName)}`,
    input.title ? `TITLE:${escapeText(input.title)}` : "",
    input.organization ? `ORG:${escapeText(input.organization)}` : "",
    input.phone ? `TEL;TYPE=WORK,VOICE:${normalizePhone(input.phone)}` : "",
    input.email ? `EMAIL;TYPE=WORK:${input.email}` : "",
    input.address ? `ADR;TYPE=WORK:;;${escapeText(input.address.replace(/,/g, "\\,"))};;;;` : "",
    input.url ? `URL:${input.url}` : "",
    input.note ? `NOTE:${escapeText(input.note)}` : "",
    "END:VCARD",
  ].filter(Boolean);
  return lines.join("\r\n");
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 7) return digits;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

function escapeText(s: string): string {
  return s.replace(/[\\;]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
}

export function vCardDataHref(vcard: string): string {
  return `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`;
}
