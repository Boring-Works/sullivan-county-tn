import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Clock, ExternalLink, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { PageFeedback } from "~/components/shared/PageFeedback";
import { TelLink } from "~/components/shared/TelLink";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { contactFormSchema } from "~/lib/schemas/contact";
import { submitContactForm } from "~/server/contact";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: seo({
      title: "Contact Sullivan County Government",
      description:
        "Phone numbers, addresses, and office hours for Sullivan County government departments and services.",
      image: "/images/og/og-courthouse.jpg",
      url: "/contact",
    }),
    links: seoLinks("/contact"),
  }),
});

const quickContacts = [
  {
    name: "Mayor's Office",
    phone: "(423) 323-6417",
    description: "County executive leadership and general inquiries",
  },
  {
    name: "County Clerk",
    phone: "(423) 323-6428",
    description: "Vehicle registration, marriage licenses, business licenses",
  },
  {
    name: "Trustee (Tax Payments)",
    phone: "(423) 323-6440",
    description: "Property tax payments, tax records, and delinquent taxes",
  },
  {
    name: "Sheriff's Office",
    phone: "(423) 279-7500",
    emergency: "911",
    description: "Law enforcement, public safety, warrant services",
  },
  {
    name: "Emergency Management",
    phone: "(423) 323-6912",
    description: "Emergency preparedness and disaster coordination",
  },
];

const externalResources = [
  { label: "Sullivan County Trustee (Tax Payments)", url: "https://sullivantntrustee.gov/" },
  { label: "Animal Shelter", url: "https://animalshelter-sullivancounty.org/" },
  { label: "Sullivan County Schools (K-12)", url: "http://www.sullivank12.net/" },
  { label: "Sullivan County Public Library", url: "https://www.scpltn.org/" },
  { label: "Sheriff's Office", url: "https://www.scsotn.com/" },
  { label: "County Clerk Records", url: "https://www.sullivancountyclerktn.com/" },
  { label: "Chancery Court", url: "https://sullivantnchancery.com/" },
  { label: "District Attorney", url: "https://sullivancountyda.com/" },
  { label: "Election Office", url: "https://www.scelect.org/" },
  { label: "Historic Sullivan (Archives/Tourism)", url: "https://www.historicsullivan.com/" },
  { label: "Register of Deeds Records", url: "https://ustitlesearch.net/" },
  {
    label: "BidNet (Purchasing Bids)",
    url: "https://www.bidnetdirect.com/tennessee/sullivancountytn",
  },
  { label: "State of Tennessee", url: "https://www.tn.gov/" },
  { label: "County Technical Assistance Service", url: "http://www.ctas.tennessee.edu/" },
];

function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <div className="mt-6 rounded-sm overflow-hidden border border-brand-surface bg-brand-parchment flex flex-col items-center justify-center gap-3 h-[250px]">
        <MapPin className="size-8 text-brand-copper" />
        <p className="font-display text-sm font-semibold text-brand-navy">
          Sullivan County Government Offices
        </p>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="inline-flex items-center gap-1.5 rounded-sm border border-brand-copper px-4 py-2 font-body text-sm font-semibold text-brand-copper hover:bg-brand-copper hover:text-white transition-colors"
        >
          Load Map
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-sm overflow-hidden border border-brand-surface">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3201.5!2d-82.329!3d36.533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885a84cb1c8e0273%3A0xd8cde48bc92169f0!2s3411%20TN-126%2C%20Blountville%2C%20TN%2037617!5e0!3m2!1sen!2sus!4v1"
        width="100%"
        height="250"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Sullivan County offices location"
        className="grayscale hover:grayscale-0 transition-all duration-500"
      />
    </div>
  );
}

function ContactPage() {
  const { t } = useTranslation();
  return (
    <main id="main-content" className="pt-24 pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          {t("contact.title")}
        </h1>
        <p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
          Reach out to Sullivan County government offices for assistance with county services,
          records, and general inquiries.
        </p>

        {/* Main contact info */}
        <div className="mb-14 rounded-sm border border-brand-surface bg-brand-parchment p-7">
          <h2 className="font-display text-xl font-bold text-brand-navy mb-5">
            Main County Office
          </h2>
          <div className="flex flex-col gap-3.5 font-body text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-copper" />
              <span>3411 TN-126, Blountville, TN 37617</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-copper" />
              <TelLink phone="(423) 323-6417" className="hover:text-brand-navy hover:underline" />
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-copper" />
              <span>Monday&ndash;Friday, 8am&ndash;5pm</span>
            </div>
          </div>
          <p className="mt-5 font-body text-sm text-brand-slate">
            For specific department information, visit our{" "}
            <Link
              to="/departments"
              search={{ category: undefined }}
              className="text-brand-copper hover:text-brand-copper-light hover:underline font-medium"
            >
              department directory
            </Link>
            .
          </p>
          {/* Map — click-to-load to save ~500KB of external resources */}
          <MapEmbed />
        </div>

        {/* Quick contacts grid */}
        <div className="mb-14">
          <h2 className="font-display text-xl font-bold text-brand-navy mb-6">Most Contacted</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickContacts.map((dept) => (
              <div
                key={dept.name}
                className="card-lift group relative rounded-sm border border-brand-surface bg-white overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-copper scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-brand-navy mb-1">
                    {dept.name}
                  </h3>
                  <p className="font-body text-sm text-brand-slate-light mb-3">
                    {dept.description}
                  </p>
                  <div className="flex flex-col gap-2 font-body text-sm">
                    <div className="flex items-center gap-2">
                      <Phone aria-hidden="true" className="size-3.5 shrink-0 text-brand-navy/50" />
                      <TelLink
                        phone={dept.phone}
                        className="hover:text-brand-navy hover:underline"
                      />
                    </div>
                    {"emergency" in dept && dept.emergency && (
                      <div className="flex items-center gap-2">
                        <Phone aria-hidden="true" className="size-3.5 shrink-0 text-brand-safety" />
                        <span className="font-semibold text-brand-safety">
                          Emergency: <TelLink phone={dept.emergency} className="hover:underline" />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />

        {/* External resources */}
        <div className="rounded-sm border border-brand-surface bg-brand-parchment p-7">
          <h2 className="font-display text-xl font-bold text-brand-navy mb-5">
            Community Resources
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {externalResources.map((resource) => (
              <li key={resource.label}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-brand-copper hover:text-brand-copper-light hover:underline"
                >
                  <ExternalLink className="size-4 shrink-0" />
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <PageFeedback />
      </div>
    </main>
  );
}

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Property Tax Question",
  "Building Permits",
  "Court Records",
  "Public Records Request",
  "Road / Highway Issue",
  "Animal Control",
  "Employment",
  "Other",
] as const;

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};

function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      await submitContactForm({ data: values });
      setSubmitted(true);
      toast.success("Message sent", {
        description: "A staff member will respond within 2 business days.",
      });
      form.reset();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error("Couldn't send message", { description: message });
    }
  }

  if (submitted) {
    return (
      <div className="mb-14 rounded-sm border border-brand-sage/30 bg-brand-sage/5 p-8 text-center">
        <CheckCircle className="mx-auto mb-4 size-10 text-brand-sage" />
        <h2 className="font-display text-xl font-bold text-brand-navy mb-2">Message Sent</h2>
        <p className="font-body text-sm text-brand-slate max-w-md mx-auto">
          Thank you for contacting Sullivan County. A staff member will respond to your inquiry
          within 2 business days during regular office hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 font-body text-sm text-brand-copper hover:text-brand-copper-light hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="mb-14 rounded-sm border border-brand-surface bg-white p-7">
      <h2 className="font-display text-xl font-bold text-brand-navy mb-2">
        {t("contact.sendMessage")}
      </h2>
      <p className="font-body text-sm text-brand-slate-light mb-6">
        Have a question or need assistance? Fill out the form below and a county staff member will
        respond within 2 business days.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Honeypot — hidden from humans, bots fill it and get rejected */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              {...form.register("website")}
              type="text"
              id="contact-website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("contact.name")} <span className="text-brand-copper">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("contact.email")} <span className="text-brand-copper">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("contact.subject")} <span className="text-brand-copper">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("contact.message")} <span className="text-brand-copper">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="How can we help you?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between gap-4 pt-1">
            <p className="font-body text-xs text-brand-stone">
              <span className="text-brand-copper">*</span> Required fields
            </p>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <Send className="size-3.5" />
              {form.formState.isSubmitting ? t("contact.sending") : t("contact.send")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
