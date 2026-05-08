export type FieldType = "text" | "email" | "tel" | "textarea" | "select" | "date" | "number";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  helpText?: string;
}

export type SubmissionMode = "online" | "in-person" | "hybrid";

export interface FormDefinition {
  type: string;
  title: string;
  description: string;
  icon: string;
  fields: FormField[];
  /** Whether the request can be submitted online, requires an in-person visit, or both. */
  submission?: SubmissionMode;
  /** ISO 8601 date — last time the form fields/copy were reviewed. GOV.UK trust pattern. */
  lastUpdated?: string;
}

/** Default last-reviewed date when a FormDefinition lacks its own. */
export const FORM_LAST_UPDATED_DEFAULT = "2026-05-07";

export const FORM_DEFINITIONS: FormDefinition[] = [
  {
    type: "building-permit",
    title: "Building Permit Application",
    description:
      "Apply for a building permit for new construction, renovation, or demolition in Sullivan County.",
    icon: "hard-hat",
    submission: "online",
    fields: [
      {
        name: "address",
        label: "Property Address",
        type: "text",
        required: true,
        placeholder: "123 Main St, Blountville, TN 37617",
      },
      {
        name: "projectType",
        label: "Project Type",
        type: "select",
        required: true,
        options: [
          { value: "new-construction", label: "New Construction" },
          { value: "renovation", label: "Renovation / Remodel" },
          { value: "addition", label: "Addition" },
          { value: "demolition", label: "Demolition" },
          { value: "electrical", label: "Electrical" },
          { value: "plumbing", label: "Plumbing" },
          { value: "mechanical", label: "Mechanical / HVAC" },
          { value: "other", label: "Other" },
        ],
      },
      {
        name: "description",
        label: "Project Description",
        type: "textarea",
        required: true,
        placeholder: "Describe the scope of work...",
      },
      {
        name: "estimatedCost",
        label: "Estimated Cost",
        type: "number",
        required: true,
        placeholder: "50000",
        helpText: "Estimated total project cost in dollars",
      },
      {
        name: "startDate",
        label: "Planned Start Date",
        type: "date",
        required: true,
      },
    ],
  },
  {
    type: "code-complaint",
    title: "Code Complaint",
    description:
      "Report a potential code violation in unincorporated Sullivan County. All complaints are kept confidential.",
    icon: "alert-triangle",
    submission: "online",
    fields: [
      {
        name: "address",
        label: "Violation Address",
        type: "text",
        required: true,
        placeholder: "Address or location of violation",
      },
      {
        name: "violationType",
        label: "Type of Violation",
        type: "select",
        required: true,
        options: [
          { value: "junk-vehicles", label: "Junk / Abandoned Vehicles" },
          { value: "overgrown-property", label: "Overgrown Property" },
          { value: "illegal-dumping", label: "Illegal Dumping" },
          { value: "building-without-permit", label: "Building Without Permit" },
          { value: "zoning-violation", label: "Zoning Violation" },
          { value: "unsafe-structure", label: "Unsafe Structure" },
          { value: "other", label: "Other" },
        ],
      },
      {
        name: "description",
        label: "Description of Violation",
        type: "textarea",
        required: true,
        placeholder: "Describe the violation in detail...",
      },
      {
        name: "photosNote",
        label: "Photos Available?",
        type: "select",
        options: [
          { value: "yes", label: "Yes — I can provide photos" },
          { value: "no", label: "No photos available" },
        ],
        helpText: "If you have photos, a county inspector may contact you to collect them.",
      },
    ],
  },
  {
    type: "public-records",
    title: "Public Records Request",
    description:
      "Submit a public records request per the Tennessee Public Records Act (T.C.A. § 10-7-503).",
    icon: "file-search",
    submission: "online",
    fields: [
      {
        name: "description",
        label: "Description of Records Requested",
        type: "textarea",
        required: true,
        placeholder: "Describe the records you are requesting as specifically as possible...",
      },
      {
        name: "dateRange",
        label: "Date Range (if applicable)",
        type: "text",
        placeholder: "e.g., January 2024 – December 2024",
      },
      {
        name: "preferredFormat",
        label: "Preferred Format",
        type: "select",
        required: true,
        options: [
          { value: "electronic", label: "Electronic (email / digital)" },
          { value: "paper", label: "Paper copies" },
          { value: "inspect", label: "Inspection only" },
        ],
      },
    ],
  },
  {
    type: "general-feedback",
    title: "General Feedback",
    description: "Share feedback, suggestions, or concerns with Sullivan County government.",
    icon: "message-square",
    submission: "online",
    fields: [
      {
        name: "department",
        label: "Department",
        type: "select",
        required: true,
        options: [
          { value: "county-mayor", label: "County Mayor's Office" },
          { value: "county-clerk", label: "County Clerk" },
          { value: "finance", label: "Finance Department" },
          { value: "highway", label: "Highway Department" },
          { value: "planning-codes", label: "Planning & Codes" },
          { value: "sheriff", label: "Sheriff's Office" },
          { value: "solid-waste", label: "Solid Waste / Sanitation" },
          { value: "other", label: "Other / General" },
        ],
      },
      {
        name: "subject",
        label: "Subject",
        type: "text",
        required: true,
        placeholder: "Brief subject line",
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: true,
        placeholder: "Your feedback or suggestion...",
      },
    ],
  },
];

export function getFormDefinition(type: string): FormDefinition | undefined {
  return FORM_DEFINITIONS.find((f) => f.type === type);
}
