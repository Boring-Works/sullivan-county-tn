import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormField } from "~/components/forms/FormField";
import { FormLayout } from "~/components/forms/FormLayout";
import { getFormDefinition } from "~/data/form-definitions";
import { submitForm } from "~/server/forms";
import { seo, seoLinks } from "~/utils/seo";

export const Route = createFileRoute("/forms/$type")({
  component: FormPage,
  head: ({ params }) => {
    const form = getFormDefinition(params.type);
    return {
      meta: form
        ? seo({
            title: `${form.title} — Sullivan County, TN`,
            description: form.description,
            image: "/images/og/og-courthouse.jpg",
            url: `/forms/${params.type}`,
          })
        : [],
      links: form ? seoLinks(`/forms/${params.type}`) : [],
    };
  },
});

function FormPage() {
  const { t } = useTranslation();
  const { type } = Route.useParams();
  const navigate = useNavigate();
  const form = getFormDefinition(type);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFieldChange = useCallback((fieldName: string, value: string) => {
    setFields((prev) => ({ ...prev, [fieldName]: value }));
  }, []);

  if (!form) {
    return (
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-brand-navy">{t("forms.formNotFound")}</h1>
        <p className="mt-2 text-brand-slate">{t("forms.formNotFoundDesc")}</p>
      </main>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await submitForm({
        data: {
          formType: type,
          name,
          email,
          phone: phone || undefined,
          fields,
          honeypot,
        },
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <FormLayout title={form.title} description={form.description}>
        <div className="rounded-md border border-brand-sage/30 bg-brand-sage/5 p-8 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-sage/10">
            <svg
              className="size-7 text-brand-sage"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <title>Success</title>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-xl font-bold text-brand-navy mb-2">
            {t("forms.submitted")}
          </h2>
          <p className="font-body text-brand-slate-light mb-6">{t("forms.submittedDesc")}</p>
          <button
            type="button"
            onClick={() => navigate({ to: "/forms" })}
            className="rounded-sm bg-brand-copper px-6 py-2.5 font-body text-sm font-semibold text-white hover:bg-brand-copper-light transition-colors"
          >
            {t("forms.backToForms")}
          </button>
        </div>
      </FormLayout>
    );
  }

  return (
    <FormLayout title={form.title} description={form.description}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="rounded-md border border-brand-surface bg-white p-6">
          <h2 className="font-display text-base font-bold text-brand-navy mb-4">
            {t("forms.yourInfo")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-body text-sm font-medium text-brand-navy mb-1.5"
              >
                {t("forms.fullName")} <span className="text-brand-safety">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={200}
                placeholder="Your full name"
                className="w-full rounded-sm border border-brand-surface bg-white px-4 py-2.5 font-body text-sm text-brand-slate placeholder:text-brand-stone/50 focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block font-body text-sm font-medium text-brand-navy mb-1.5"
              >
                {t("forms.email")} <span className="text-brand-safety">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={320}
                placeholder="you@example.com"
                className="w-full rounded-sm border border-brand-surface bg-white px-4 py-2.5 font-body text-sm text-brand-slate placeholder:text-brand-stone/50 focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none transition-colors"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="contact-phone"
                className="block font-body text-sm font-medium text-brand-navy mb-1.5"
              >
                {t("forms.phone")}{" "}
                <span className="text-brand-stone font-normal">({t("forms.optional")})</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(423) 555-0123"
                className="w-full rounded-sm border border-brand-surface bg-white px-4 py-2.5 font-body text-sm text-brand-slate placeholder:text-brand-stone/50 focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Form-Specific Fields */}
        <div className="rounded-md border border-brand-surface bg-white p-6">
          <h2 className="font-display text-base font-bold text-brand-navy mb-4">
            {form.title} — {t("forms.details")}
          </h2>
          <div className="space-y-4">
            {form.fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={fields[field.name] ?? ""}
                onChange={handleFieldChange}
              />
            ))}
          </div>
        </div>

        {error && (
          <div className="rounded-sm border border-brand-safety/30 bg-brand-safety/5 px-4 py-3 font-body text-sm text-brand-safety">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <p className="font-body text-xs text-brand-stone">
            <span className="text-brand-safety">*</span> {t("forms.required")}
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-sm bg-brand-copper px-8 py-2.5 font-body text-sm font-semibold text-white hover:bg-brand-copper-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? t("forms.submitting") : t("forms.submit")}
          </button>
        </div>
      </form>
    </FormLayout>
  );
}
