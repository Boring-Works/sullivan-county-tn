import type { FormField as FormFieldDef } from "~/data/form-definitions";
import { cn } from "~/lib/utils";

interface FormFieldProps {
  field: FormFieldDef;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
}

const baseInputClass =
  "w-full rounded-sm border border-brand-surface bg-white px-4 py-2.5 font-body text-sm text-brand-slate placeholder:text-brand-stone/50 focus:border-brand-copper focus:ring-1 focus:ring-brand-copper focus:outline-none transition-colors";

export function FormField({ field, value, onChange, error }: FormFieldProps) {
  const id = `field-${field.name}`;

  return (
    <div>
      <label htmlFor={id} className="block font-body text-sm font-medium text-brand-navy mb-1.5">
        {field.label}
        {field.required && <span className="text-brand-safety ml-0.5">*</span>}
      </label>

      {field.type === "select" ? (
        <select
          id={id}
          name={field.name}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={cn(baseInputClass, !value && "text-brand-stone/50")}
          required={field.required}
        >
          <option value="">Select...</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          id={id}
          name={field.name}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className={cn(baseInputClass, "resize-y min-h-[100px]")}
          required={field.required}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          className={baseInputClass}
          required={field.required}
        />
      )}

      {field.helpText && (
        <p className="mt-1 font-body text-xs text-brand-stone">{field.helpText}</p>
      )}

      {error && (
        <p role="alert" className="mt-1 font-body text-xs text-brand-safety">
          {error}
        </p>
      )}
    </div>
  );
}
