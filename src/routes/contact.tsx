import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle, Clock, ExternalLink, MapPin, Phone, Send } from "lucide-react";
import { type FormEvent, useState } from "react";
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

function ContactPage() {
  return (
    <main id="main-content" className="pt-24 pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
          Contact Sullivan County
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
              <Phone className="mt-0.5 size-4 shrink-0 text-brand-copper" />
              <a href="tel:+14233236417" className="hover:text-brand-navy hover:underline">
                (423) 323-6417
              </a>
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
              className="text-brand-copper hover:text-brand-copper-light hover:underline font-medium"
            >
              department directory
            </Link>
            .
          </p>
          {/* Map */}
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
                      <Phone className="size-3.5 shrink-0 text-brand-navy/50" />
                      <a
                        href={`tel:${dept.phone.replace(/[^\d+]/g, "")}`}
                        className="hover:text-brand-navy hover:underline"
                      >
                        {dept.phone}
                      </a>
                    </div>
                    {"emergency" in dept && dept.emergency && (
                      <div className="flex items-center gap-2">
                        <Phone className="size-3.5 shrink-0 text-brand-safety" />
                        <span className="font-semibold text-brand-safety">
                          Emergency: {dept.emergency}
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

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    try {
      await submitContactForm({
        data: {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          subject: formData.get("subject") as string,
          message: formData.get("message") as string,
          website: formData.get("website") as string,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
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
      <h2 className="font-display text-xl font-bold text-brand-navy mb-2">Send a Message</h2>
      <p className="font-body text-sm text-brand-slate-light mb-6">
        Have a question or need assistance? Fill out the form below and a county staff member will
        respond within 2 business days.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot — hidden from humans, bots fill it and get rejected */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input type="text" id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-body text-sm font-medium text-brand-navy mb-1.5"
            >
              Full Name <span className="text-brand-copper">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              className="w-full rounded-sm border border-brand-surface bg-brand-cream px-3.5 py-2.5 font-body text-sm text-brand-slate placeholder:text-brand-stone/60 focus:border-brand-copper focus:outline-none focus:ring-1 focus:ring-brand-copper/30 transition-colors"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="block font-body text-sm font-medium text-brand-navy mb-1.5"
            >
              Email Address <span className="text-brand-copper">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="w-full rounded-sm border border-brand-surface bg-brand-cream px-3.5 py-2.5 font-body text-sm text-brand-slate placeholder:text-brand-stone/60 focus:border-brand-copper focus:outline-none focus:ring-1 focus:ring-brand-copper/30 transition-colors"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="contact-subject"
            className="block font-body text-sm font-medium text-brand-navy mb-1.5"
          >
            Subject <span className="text-brand-copper">*</span>
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            className="w-full rounded-sm border border-brand-surface bg-brand-cream px-3.5 py-2.5 font-body text-sm text-brand-slate focus:border-brand-copper focus:outline-none focus:ring-1 focus:ring-brand-copper/30 transition-colors"
          >
            <option value="">Select a topic...</option>
            {SUBJECT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="block font-body text-sm font-medium text-brand-navy mb-1.5"
          >
            Message <span className="text-brand-copper">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className="w-full rounded-sm border border-brand-surface bg-brand-cream px-3.5 py-2.5 font-body text-sm text-brand-slate placeholder:text-brand-stone/60 focus:border-brand-copper focus:outline-none focus:ring-1 focus:ring-brand-copper/30 transition-colors resize-y"
            placeholder="How can we help you?"
          />
        </div>
        {error && (
          <div className="flex items-start gap-2.5 rounded-sm border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <p className="font-body text-sm text-red-700">{error}</p>
          </div>
        )}
        <div className="flex items-center justify-between gap-4 pt-1">
          <p className="font-body text-xs text-brand-stone">
            <span className="text-brand-copper">*</span> Required fields
          </p>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 rounded-sm bg-brand-copper px-6 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-brand-copper-light disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send className="size-3.5" />
            {sending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
