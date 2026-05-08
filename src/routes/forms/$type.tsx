import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";
import { FormLayout } from "~/components/forms/FormLayout";
import { DetailBreadcrumb } from "~/components/shared/DetailBreadcrumb";
import { PageFeedback } from "~/components/shared/PageFeedback";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  FORM_LAST_UPDATED_DEFAULT,
  type FormDefinition,
  type FormField as FormFieldDef,
  getFormDefinition,
} from "~/data/form-definitions";
import { governmentServiceJsonLd, jsonLdString } from "~/lib/jsonld";
import { submitForm } from "~/server/forms";
import { SITE_URL, seo, seoLinks } from "~/utils/seo";

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

/**
 * Build a Zod schema from a FormDefinition. Each FormField becomes a string
 * (or enum for select) with required-ness applied.
 */
function buildFieldsSchema(def: FormDefinition) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of def.fields) {
    const required = f.required ?? false;
    let base: z.ZodTypeAny;
    if (f.type === "select" && f.options && f.options.length > 0) {
      const values = f.options.map((o) => o.value) as [string, ...string[]];
      base = z.enum(values, { message: `${f.label} is required` });
    } else if (f.type === "email") {
      base = z.string().email({ message: "Enter a valid email address" });
    } else if (f.type === "number") {
      base = z.string().regex(/^[0-9]+(\.[0-9]+)?$/, { message: "Numbers only" });
    } else {
      base = z.string();
    }
    if (required) {
      shape[f.name] = base.refine((v) => v != null && String(v).trim().length > 0, {
        message: `${f.label} is required`,
      });
    } else {
      shape[f.name] = base.optional().or(z.literal(""));
    }
  }
  return z.object(shape);
}

const baseContactSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(200),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")), // honeypot
});

function FormPage() {
  const { t } = useTranslation();
  const { type } = Route.useParams();
  const navigate = useNavigate();
  const form = getFormDefinition(type);

  if (!form) {
    return (
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-brand-navy">{t("forms.formNotFound")}</h1>
        <p className="mt-2 text-brand-slate">{t("forms.formNotFoundDesc")}</p>
        <Button asChild variant="copper" className="mt-6">
          <Link to="/forms">{t("forms.backToForms")}</Link>
        </Button>
      </main>
    );
  }

  return <ActiveFormPage form={form} formType={type} navigate={navigate} t={t} />;
}

interface ActiveFormPageProps {
  form: FormDefinition;
  formType: string;
  navigate: ReturnType<typeof useNavigate>;
  t: (k: string) => string;
}

function ActiveFormPage({ form, formType, navigate, t }: ActiveFormPageProps) {
  // Compose the full schema once per form definition.
  const fieldsSchema = buildFieldsSchema(form);
  const schema = baseContactSchema.extend({ fields: fieldsSchema });
  type Values = z.infer<typeof schema>;

  const defaultFields = Object.fromEntries(form.fields.map((f) => [f.name, ""])) as Record<
    string,
    string
  >;

  const rhf = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      fields: defaultFields,
    },
  });

  async function onSubmit(values: Values) {
    try {
      await submitForm({
        data: {
          formType,
          name: values.name,
          email: values.email,
          phone: values.phone || undefined,
          fields: values.fields as Record<string, string>,
          honeypot: values.website,
        },
      });
      toast.success(t("forms.submitted"), { description: t("forms.submittedDesc") });
      // Reset form and route to a clean state
      rhf.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Submission failed. Please try again.";
      toast.error("Couldn't submit", { description: message });
    }
  }

  // Render the success card after a successful submission *only* if the form
  // is no longer dirty (post reset). We use formState.isSubmitSuccessful as a
  // proxy and gate it through "fields are now empty".
  const justSubmitted = rhf.formState.isSubmitSuccessful;

  if (justSubmitted) {
    return (
      <FormLayout title={form.title} description={form.description}>
        <div className="rounded-sm border border-brand-sage/30 bg-brand-sage/5 p-8 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-sage/10">
            <CheckCircle aria-hidden="true" className="size-7 text-brand-sage" />
          </div>
          <h2 className="font-display text-xl font-bold text-brand-navy mb-2">
            {t("forms.submitted")}
          </h2>
          <p className="font-body text-brand-slate-light mb-6">{t("forms.submittedDesc")}</p>
          <Button variant="copper" onClick={() => navigate({ to: "/forms" })}>
            {t("forms.backToForms")}
          </Button>
        </div>
      </FormLayout>
    );
  }

  const serviceLd = jsonLdString(
    governmentServiceJsonLd({
      name: form.title,
      serviceType: form.type,
      description: form.description,
      url: `${SITE_URL}/forms/${form.type}`,
      potentialActionUrl: `${SITE_URL}/forms/${form.type}`,
      potentialActionName: t("forms.startForm"),
    }),
  );

  const lastUpdated = form.lastUpdated ?? FORM_LAST_UPDATED_DEFAULT;

  return (
    <FormLayout title={form.title} description={form.description}>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: serviceLd }}
      />

      <DetailBreadcrumb
        className="-mt-4 mb-6"
        items={[
          { label: "Home", to: "/" },
          { label: "Forms", to: "/forms" },
          { label: form.title },
        ]}
      />

      <Form {...rhf}>
        <form onSubmit={rhf.handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot — hidden, bots fill it; submission rejected by server. */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="forms-website">Website</label>
            <input
              id="forms-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...rhf.register("website")}
            />
          </div>

          {/* Contact Information */}
          <div className="rounded-sm border border-brand-surface bg-white p-6">
            <h2 className="font-display text-base font-bold text-brand-navy mb-4">
              {t("forms.yourInfo")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={rhf.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("forms.fullName")} <span className="text-brand-copper">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={rhf.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("forms.email")} <span className="text-brand-copper">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={rhf.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>
                      {t("forms.phone")}{" "}
                      <span className="text-brand-stone font-normal">({t("forms.optional")})</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(423) 555-0123"
                        autoComplete="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Form-Specific Fields */}
          <div className="rounded-sm border border-brand-surface bg-white p-6">
            <h2 className="font-display text-base font-bold text-brand-navy mb-4">
              {form.title} — {t("forms.details")}
            </h2>
            <div className="space-y-4">
              {form.fields.map((fdef) => (
                <DynamicField
                  key={fdef.name}
                  fdef={fdef}
                  control={rhf.control}
                  name={`fields.${fdef.name}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="font-body text-xs text-brand-stone">
              <span className="text-brand-copper">*</span> {t("forms.required")}
            </p>
            <Button type="submit" variant="copper" size="lg" disabled={rhf.formState.isSubmitting}>
              {rhf.formState.isSubmitting ? t("forms.submitting") : t("forms.submit")}
            </Button>
          </div>
        </form>
      </Form>

      <p className="mt-8 text-center font-body text-xs text-brand-stone">
        Last reviewed{" "}
        <time dateTime={lastUpdated}>
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(`${lastUpdated}T00:00:00`))}
        </time>
      </p>

      <PageFeedback />
    </FormLayout>
  );
}

/**
 * Renders a single dynamic field driven by the FormFieldDef shape, wired into
 * the parent react-hook-form via the dotted name path (e.g. "fields.address").
 */
interface DynamicFieldProps {
  fdef: FormFieldDef;
  // biome-ignore lint/suspicious/noExplicitAny: control is generic across schemas
  control: any;
  name: string;
}

function DynamicField({ fdef, control, name }: DynamicFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {fdef.label}
            {fdef.required ? <span className="text-brand-copper"> *</span> : null}
          </FormLabel>
          <FormControl>
            {fdef.type === "textarea" ? (
              <Textarea
                rows={5}
                placeholder={fdef.placeholder}
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            ) : fdef.type === "select" ? (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger>
                  <SelectValue placeholder={fdef.placeholder ?? "Select…"} />
                </SelectTrigger>
                <SelectContent>
                  {(fdef.options ?? []).map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={fdef.type === "number" ? "number" : fdef.type}
                placeholder={fdef.placeholder}
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            )}
          </FormControl>
          {fdef.helpText && <FormDescription>{fdef.helpText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
