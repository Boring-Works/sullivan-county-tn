# Sullivan County Full Content Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enrich all department pages with their full scraped content, add missing structural pages (ADA, Privacy, Employee Services), expand community links, and complete commissioners resources.

**Architecture:** Extend the existing `Department` interface with optional typed fields for rich content. DepartmentDetail component gets new conditional sections. Three new static content routes. Contact page gets expanded community links.

**Tech Stack:** TanStack Start, TypeScript, Tailwind v4, shadcn/ui, Cloudflare Workers

**Design Doc:** `docs/plans/2026-02-27-sullivan-county-full-content-design.md`

**Data Source:** `../sullivancountytn-full-scrape.md` (1082 lines)

---

## Phase 1: Data Layer — New Interfaces & Types

### Task 1: Add rich content interfaces to departments.ts

**Files:**
- Modify: `src/data/departments.ts:1-47` (interfaces section)

**Step 1: Add new interfaces after the existing `ExternalLink` interface (line 34)**

Add these interfaces between `ExternalLink` and `Department`:

```ts
export interface KeyDocument {
	name: string;
	url?: string;
	description?: string;
}

export interface MeetingSchedule {
	name: string;
	schedule: string;
	location?: string;
}

export interface FaqItem {
	question: string;
	answer: string;
}

export interface BidThreshold {
	range: string;
	process: string;
}

export interface Publication {
	name: string;
	url?: string;
}
```

**Step 2: Add optional fields to the `Department` interface (after `externalLinks`)**

```ts
	keyDocuments?: KeyDocument[];
	meetingSchedule?: MeetingSchedule[];
	faqItems?: FaqItem[];
	bidThresholds?: BidThreshold[];
	importantNotes?: string[];
	publications?: Publication[];
```

**Step 3: Verify build**

Run: `cd "/Users/codyboring/CodyML/projects/Sullivan County/site" && npm run build`
Expected: Build succeeds (new optional fields don't break existing data)

**Step 4: Commit**

```bash
git add src/data/departments.ts
git commit -m "feat: add rich content interfaces to Department type"
```

---

## Phase 2: Department Content Enrichment (7 departments)

### Task 2: Enrich County Clerk with key documents

**Files:**
- Modify: `src/data/departments.ts` (county-clerk entry, ~line 95-142)

**Step 1: Add `keyDocuments` to the county-clerk department object**

After the `externalLinks` array, add:

```ts
		keyDocuments: [
			{
				name: "Business Tax Notice #23-08",
				description: "Filing threshold increased to $100,000",
			},
			{
				name: "Hotel/Motel Tax Notice",
				description: "Hotel/motel tax requirements and filing information",
			},
		],
```

**Step 2: Verify build**

Run: `npm run build`

---

### Task 3: Enrich Emergency Management with meetings and documents

**Files:**
- Modify: `src/data/departments.ts` (emergency-management entry, ~line 289-320)

**Step 1: Add `meetingSchedule` and `keyDocuments`**

After the `externalLinks` array, add:

```ts
		meetingSchedule: [
			{
				name: "LEPC (Local Emergency Preparedness Council)",
				schedule: "3rd Wednesday of each month at 7:30 AM (except December)",
				location: "Blountville office",
			},
		],
		keyDocuments: [
			{
				name: "Sullivan Hazard Mitigation Plan",
				description: "Multi-jurisdictional plan with Bluff City, Bristol, and Kingsport",
			},
			{
				name: "Sullivan LEPC By-Laws",
				description: "Governing by-laws for the Local Emergency Preparedness Council",
			},
		],
```

---

### Task 4: Enrich Property Assessor with FAQ and notes

**Files:**
- Modify: `src/data/departments.ts` (property-assessor entry, ~line 420-449)

**Step 1: Add `faqItems` and `importantNotes`**

After the `externalLinks` array, add:

```ts
		faqItems: [
			{
				question: "Does the Property Assessor set tax rates?",
				answer: "No. The Assessor does not set tax rates, send tax bills, or collect property taxes. Those functions are handled by other offices.",
			},
			{
				question: "When is the next reappraisal?",
				answer: "The next statewide reappraisal is scheduled for 2025.",
			},
		],
		importantNotes: [
			"The Property Assessor does NOT set tax rates",
			"The Property Assessor does NOT send tax bills",
			"The Property Assessor does NOT collect property taxes",
			"Educational videos on property assessments and tax rates are available through the State Board of Equalization",
		],
```

---

### Task 5: Enrich Planning and Codes with documents and notes

**Files:**
- Modify: `src/data/departments.ts` (planning-and-codes entry, ~line 550-575)

**Step 1: Add `keyDocuments` and `importantNotes`**

After the `services` array, add:

```ts
		keyDocuments: [
			{ name: "Zoning Code 2025" },
			{ name: "Zoning Title and Index 2025" },
			{ name: "Subdivision Regulations 2024" },
			{ name: "Appendices 2024" },
			{ name: "Permit Form (August 2024)" },
		],
		importantNotes: [
			"Sullivan County adopted zoning in 1988",
			"2018 International Residential Code and 2018 Energy Code adopted effective April 1, 2018",
			"Electrical permits are issued by the State of Tennessee via the CORE online system",
			"Board meetings are held at the Historic Courthouse Commission Room (2nd floor) and are open to the public",
		],
```

---

### Task 6: Enrich Purchasing with bid thresholds and notes

**Files:**
- Modify: `src/data/departments.ts` (purchasing entry, ~line 576-616)

**Step 1: Add `bidThresholds` and `importantNotes`**

After the `externalLinks` array, add:

```ts
		bidThresholds: [
			{ range: "$0 – $9,999.99 (Micro)", process: "Open market, quote/receipt submission" },
			{ range: "$10,000 – $19,999.99 (Small)", process: "One quote + two informal quotes" },
			{ range: "$20,000 – $49,999.99 (Mid-range)", process: "Minimum 3 competitive formal quotes" },
			{ range: "$50,000+ (Large)", process: "Written, sealed competitive proposals; advertised in newspaper 5 days prior; public opening" },
		],
		importantNotes: [
			"All vendors must register before purchase order issuance",
			"Records retained minimum 10 years (infinite for construction projects)",
			"Awards based on 'lowest and best bidder' considering quality, specs, suitability, and delivery",
			"Splitting requisitions to avoid competitive bidding thresholds is prohibited",
			"Department heads must authorize all requisitions",
			"Solicitations transitioned from Vendor Registry to BidNet effective September 1, 2025",
		],
```

---

### Task 7: Enrich Soil & Water Conservation with publications

**Files:**
- Modify: `src/data/departments.ts` (soil-water-conservation entry, ~line 704-741)

**Step 1: Add `publications` and `importantNotes`**

After the `externalLinks` array, add:

```ts
		publications: [
			{ name: "SCSWCD Brochure" },
			{ name: "FY 2025 Annual Report" },
		],
		importantNotes: [
			"Best Management Practices include: cover crops, filter strips, stream buffers, sediment control, exclusion fencing, and grazing systems",
			"NASDA Foundation EPA Gulf of America Farmer-to-Farmer Grants available",
		],
```

---

### Task 8: Enrich Archives & Tourism with detailed notes

**Files:**
- Modify: `src/data/departments.ts` (archives-and-tourism entry, ~line 653-677)

**Step 1: Add `importantNotes`**

After the `externalLinks` array, add:

```ts
		importantNotes: [
			"The Old Deery Inn in Blountville features 18 rooms, 2 attics, 3 cellars, and 10 outbuildings",
			"The inn was home to Mrs. Virginia Byers Caldwell and Judge Joseph Anderson Caldwell",
			"The Sunnyside Trail offers walking access to Northeast Tennessee historic sites",
			"The department describes the region as 'a Museum of Masterpieces, both old and new'",
		],
```

**Step 2: Verify full build after all department enrichment**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit all department data enrichment**

```bash
git add src/data/departments.ts
git commit -m "feat: add rich content to 7 departments (docs, meetings, FAQ, bid thresholds)"
```

---

## Phase 3: DepartmentDetail Component — New Sections

### Task 9: Add Important Notes section

**Files:**
- Modify: `src/components/departments/DepartmentDetail.tsx`

**Step 1: Add Important Notes section**

Add after the Services `</section>` and before the Additional Offices section. This renders as an amber-tinted callout:

```tsx
						{/* Important Notes */}
						{department.importantNotes && department.importantNotes.length > 0 && (
							<section>
								<h2 className="font-display mb-4 text-xl font-bold text-brand-navy">
									Important Notes
								</h2>
								<div className="rounded-sm border border-amber-200 bg-amber-50 p-5">
									<ul className="space-y-2">
										{department.importantNotes.map((note) => (
											<li key={note} className="flex items-start gap-3">
												<span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
												<span className="font-body text-sm text-amber-900">{note}</span>
											</li>
										))}
									</ul>
								</div>
							</section>
						)}
```

**Step 2: Verify build**

Run: `npm run build`

---

### Task 10: Add Bid Thresholds section

**Files:**
- Modify: `src/components/departments/DepartmentDetail.tsx`

**Step 1: Add Bid Thresholds table section**

Add after Important Notes section:

```tsx
						{/* Bid Thresholds */}
						{department.bidThresholds && department.bidThresholds.length > 0 && (
							<section>
								<h2 className="font-display mb-5 text-xl font-bold text-brand-navy">
									Bid Thresholds
								</h2>
								<div className="overflow-x-auto rounded-sm border border-brand-surface">
									<table className="w-full font-body text-sm">
										<thead>
											<tr className="border-b border-brand-surface bg-brand-parchment">
												<th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
													Purchase Range
												</th>
												<th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
													Process Required
												</th>
											</tr>
										</thead>
										<tbody>
											{department.bidThresholds.map((threshold) => (
												<tr
													key={threshold.range}
													className="border-b border-brand-surface last:border-b-0 even:bg-brand-parchment/50"
												>
													<td className="px-5 py-3.5 font-medium text-brand-slate whitespace-nowrap">
														{threshold.range}
													</td>
													<td className="px-5 py-3.5 text-brand-slate">
														{threshold.process}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</section>
						)}
```

---

### Task 11: Add Key Documents section

**Files:**
- Modify: `src/components/departments/DepartmentDetail.tsx`

**Step 1: Import FileText icon**

Add `FileText` to the lucide-react import at the top of the file.

**Step 2: Add Key Documents section**

Add after Bid Thresholds:

```tsx
						{/* Key Documents */}
						{department.keyDocuments && department.keyDocuments.length > 0 && (
							<section>
								<h2 className="font-display mb-4 text-xl font-bold text-brand-navy">
									Key Documents
								</h2>
								<ul className="space-y-3">
									{department.keyDocuments.map((doc) => (
										<li key={doc.name} className="flex items-start gap-3">
											<FileText className="mt-0.5 size-4 shrink-0 text-brand-copper" />
											<div>
												{doc.url ? (
													<a
														href={doc.url}
														target="_blank"
														rel="noopener noreferrer"
														className="font-body font-medium text-brand-copper hover:text-brand-copper-light transition-colors"
													>
														{doc.name}
													</a>
												) : (
													<span className="font-body font-medium text-brand-slate">
														{doc.name}
													</span>
												)}
												{doc.description && (
													<p className="mt-0.5 font-body text-sm text-brand-slate-light">
														{doc.description}
													</p>
												)}
											</div>
										</li>
									))}
								</ul>
							</section>
						)}
```

---

### Task 12: Add Meeting Schedule section

**Files:**
- Modify: `src/components/departments/DepartmentDetail.tsx`

**Step 1: Import Calendar icon**

Add `Calendar` to the lucide-react import.

**Step 2: Add Meeting Schedule section**

Add after Key Documents:

```tsx
						{/* Meeting Schedule */}
						{department.meetingSchedule && department.meetingSchedule.length > 0 && (
							<section>
								<h2 className="font-display mb-5 text-xl font-bold text-brand-navy">
									Meeting Schedule
								</h2>
								<div className="grid gap-4 sm:grid-cols-2">
									{department.meetingSchedule.map((meeting) => (
										<div
											key={meeting.name}
											className="rounded-sm border border-brand-surface bg-white p-5"
										>
											<h3 className="font-display text-base font-bold text-brand-navy mb-2">
												{meeting.name}
											</h3>
											<div className="flex items-start gap-2.5 font-body text-sm text-brand-slate">
												<Calendar className="mt-0.5 size-4 shrink-0 text-brand-navy/60" />
												<span>{meeting.schedule}</span>
											</div>
											{meeting.location && (
												<div className="flex items-start gap-2.5 font-body text-sm text-brand-slate mt-2">
													<MapPin className="mt-0.5 size-4 shrink-0 text-brand-navy/60" />
													<span>{meeting.location}</span>
												</div>
											)}
										</div>
									))}
								</div>
							</section>
						)}
```

---

### Task 13: Add Publications section

**Files:**
- Modify: `src/components/departments/DepartmentDetail.tsx`

**Step 1: Import Download icon**

Add `Download` to the lucide-react import.

**Step 2: Add Publications section**

Add after Meeting Schedule:

```tsx
						{/* Publications */}
						{department.publications && department.publications.length > 0 && (
							<section>
								<h2 className="font-display mb-4 text-xl font-bold text-brand-navy">
									Publications
								</h2>
								<ul className="space-y-2.5">
									{department.publications.map((pub) => (
										<li key={pub.name}>
											{pub.url ? (
												<a
													href={pub.url}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center gap-2 font-body text-brand-copper hover:text-brand-copper-light transition-colors"
												>
													<Download className="size-4 shrink-0" />
													{pub.name}
												</a>
											) : (
												<span className="inline-flex items-center gap-2 font-body text-brand-slate">
													<FileText className="size-4 shrink-0 text-brand-navy/60" />
													{pub.name}
												</span>
											)}
										</li>
									))}
								</ul>
							</section>
						)}
```

---

### Task 14: Add FAQ section

**Files:**
- Modify: `src/components/departments/DepartmentDetail.tsx`

**Step 1: Add FAQ section**

Add after Publications, before the Additional Offices section:

```tsx
						{/* FAQ */}
						{department.faqItems && department.faqItems.length > 0 && (
							<section>
								<h2 className="font-display mb-5 text-xl font-bold text-brand-navy">
									Frequently Asked Questions
								</h2>
								<div className="space-y-4">
									{department.faqItems.map((faq) => (
										<div
											key={faq.question}
											className="rounded-sm border border-brand-surface bg-white p-5"
										>
											<h3 className="font-display text-base font-bold text-brand-navy mb-2">
												{faq.question}
											</h3>
											<p className="font-body text-sm leading-relaxed text-brand-slate">
												{faq.answer}
											</p>
										</div>
									))}
								</div>
							</section>
						)}
```

**Step 2: Verify build with all new sections**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit component changes**

```bash
git add src/components/departments/DepartmentDetail.tsx
git commit -m "feat: add 6 rich content sections to DepartmentDetail (notes, bids, docs, meetings, publications, FAQ)"
```

---

## Phase 4: Commissioners Resources

### Task 15: Expand Commission Resources section

**Files:**
- Modify: `src/routes/commissioners.tsx`

**Step 1: Replace the existing Commission Resources box**

Replace the current `<div className="mt-16 rounded-sm...">` block with:

```tsx
				<div className="mt-16 rounded-sm border border-brand-surface bg-brand-parchment p-7">
					<h2 className="font-display text-xl font-bold text-brand-navy mb-5">
						Commission Resources
					</h2>
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2.5 font-body text-sm text-brand-slate">
							<h3 className="font-display text-base font-bold text-brand-navy">Meeting Information</h3>
							<p>Current agendas and meeting packets are published before each session.</p>
							<p>Previous minutes are available through the Sullivan County Clerk.</p>
							<p>Commission meetings are streamed live on YouTube.</p>
						</div>
						<div className="space-y-2.5 font-body text-sm text-brand-slate">
							<h3 className="font-display text-base font-bold text-brand-navy">Contact</h3>
							<p>County Offices: 3411 TN-126, Blountville, TN 37617</p>
							<ul className="space-y-2 mt-3">
								<li>
									<a
										href="https://www.youtube.com/@sullivancountycommission"
										target="_blank"
										rel="noopener noreferrer"
										className="text-brand-copper hover:text-brand-copper-light hover:underline"
									>
										YouTube — Commission Streams
									</a>
								</li>
								<li>
									<a
										href="https://www.sullivancountyclerktn.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-brand-copper hover:text-brand-copper-light hover:underline"
									>
										County Clerk — Previous Minutes
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
```

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/routes/commissioners.tsx
git commit -m "feat: expand commissioners page with meeting resources and links"
```

---

## Phase 5: Missing Structural Pages

### Task 16: Create ADA Compliance page

**Files:**
- Create: `src/routes/ada-compliance.tsx`

**Step 1: Create the route file**

Note: The footer already links to `/ada-compliance` (SiteFooter.tsx line 146).

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/ada-compliance")({
	component: AdaCompliancePage,
});

function AdaCompliancePage() {
	return (
		<main className="py-14">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-4 h-px w-12 bg-brand-copper" />
				<h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
					ADA Compliance
				</h1>
				<p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
					Sullivan County is committed to ensuring accessibility for all individuals in
					accordance with federal law.
				</p>

				{/* Legal Framework */}
				<div className="space-y-10 max-w-3xl">
					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Legal Framework
						</h2>
						<div className="space-y-5">
							<div className="rounded-sm border border-brand-surface bg-white p-5">
								<h3 className="font-display text-base font-bold text-brand-navy mb-2">
									Section 504 of the Rehabilitation Act of 1973
								</h3>
								<p className="font-body text-sm leading-relaxed text-brand-slate">
									Prohibits discrimination based on disability by programs receiving
									federal financial assistance.
								</p>
							</div>
							<div className="rounded-sm border border-brand-surface bg-white p-5">
								<h3 className="font-display text-base font-bold text-brand-navy mb-2">
									Americans with Disabilities Act (ADA) of 1990
								</h3>
								<ul className="space-y-1.5 font-body text-sm text-brand-slate">
									<li>Title I — Employment</li>
									<li>Title II — State and local government services</li>
									<li>Title III — Public accommodations</li>
									<li>Title IV — Telecommunications</li>
									<li>Title V — Miscellaneous provisions</li>
								</ul>
							</div>
						</div>
					</section>

					{/* Accommodation Requests */}
					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Accommodation Requests
						</h2>
						<div className="space-y-3 font-body text-sm leading-relaxed text-brand-slate">
							<p>
								<strong>General requests:</strong> Submit the county's designated
								accommodation request form.
							</p>
							<p>
								<strong>Court-specific requests:</strong> Submit a written request to the
								ADA Coordinator at least 5 business days before the accommodation is
								needed.
							</p>
						</div>
					</section>

					{/* Policy */}
					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Non-Discrimination Policy
						</h2>
						<div className="rounded-sm border border-brand-surface bg-brand-parchment p-5">
							<p className="font-body text-sm leading-relaxed text-brand-slate">
								The judicial branch does not permit discrimination based on physical or
								mental disability and will provide reasonable modifications for qualified
								individuals with disabilities.
							</p>
						</div>
					</section>

					{/* Coordinators */}
					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							ADA Coordinators
						</h2>
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="rounded-sm border border-brand-surface bg-white p-5">
								<h3 className="font-display text-base font-bold text-brand-navy mb-3">
									Local Coordinator
								</h3>
								<div className="space-y-2 font-body text-sm text-brand-slate">
									<p className="font-medium">Bobby L. Russell, Circuit Court Clerk</p>
									<div className="flex items-start gap-2.5">
										<MapPin className="mt-0.5 size-4 shrink-0 text-brand-copper" />
										<span>Sullivan County Justice Center, Blountville, TN 37617</span>
									</div>
									<div className="flex items-start gap-2.5">
										<Phone className="mt-0.5 size-4 shrink-0 text-brand-copper" />
										<a href="tel:+14232792752" className="hover:text-brand-navy hover:underline">
											(423) 279-2752
										</a>
									</div>
								</div>
							</div>
							<div className="rounded-sm border border-brand-surface bg-white p-5">
								<h3 className="font-display text-base font-bold text-brand-navy mb-3">
									State Coordinator
								</h3>
								<div className="space-y-2 font-body text-sm text-brand-slate">
									<p className="font-medium">Tennessee ADA Coordinator</p>
									<div className="flex items-start gap-2.5">
										<MapPin className="mt-0.5 size-4 shrink-0 text-brand-copper" />
										<span>511 Union Street, Suite 600, Nashville, TN 37219</span>
									</div>
									<div className="flex items-start gap-2.5">
										<Phone className="mt-0.5 size-4 shrink-0 text-brand-copper" />
										<span>(615) 741-2687 or (800) 448-7970</span>
									</div>
									<div className="flex items-start gap-2.5">
										<Mail className="mt-0.5 size-4 shrink-0 text-brand-copper" />
										<a
											href="mailto:adacoordinator@tscmail.state.tn.us"
											className="hover:text-brand-navy hover:underline break-all"
										>
											adacoordinator@tscmail.state.tn.us
										</a>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}
```

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/routes/ada-compliance.tsx
git commit -m "feat: add ADA Compliance page"
```

---

### Task 17: Create Privacy Policy page

**Files:**
- Create: `src/routes/privacy-policy.tsx`

**Step 1: Create the route file**

Note: Footer already links to `/privacy-policy` (SiteFooter.tsx line 149).

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
	component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
	return (
		<main className="py-14">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-4 h-px w-12 bg-brand-copper" />
				<h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
					Privacy Policy
				</h1>
				<p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
					How Sullivan County collects, uses, and protects your information when you visit
					our website.
				</p>

				<div className="space-y-10 max-w-3xl">
					{/* Data Collection */}
					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Data Collection
						</h2>
						<div className="space-y-4 font-body text-sm leading-relaxed text-brand-slate">
							<div>
								<h3 className="font-display text-base font-bold text-brand-navy mb-2">
									Comments
								</h3>
								<p>
									When visitors leave comments, we collect the data shown in the
									comment form, the visitor's IP address, and browser user agent string
									to help spam detection.
								</p>
							</div>
							<div>
								<h3 className="font-display text-base font-bold text-brand-navy mb-2">
									Gravatar
								</h3>
								<p>
									An anonymized string created from your email address (a hash) may be
									provided to the Gravatar service to see if you are using it.
								</p>
							</div>
							<div>
								<h3 className="font-display text-base font-bold text-brand-navy mb-2">
									Media
								</h3>
								<p>
									If you upload images to the website, you should avoid uploading images
									with embedded location data (EXIF GPS). Visitors to the website can
									download and extract location data from images.
								</p>
							</div>
						</div>
					</section>

					{/* Cookies */}
					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Cookies
						</h2>
						<div className="overflow-x-auto rounded-sm border border-brand-surface">
							<table className="w-full font-body text-sm">
								<thead>
									<tr className="border-b border-brand-surface bg-brand-parchment">
										<th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
											Cookie Type
										</th>
										<th className="px-5 py-3.5 text-left font-semibold text-brand-navy">
											Duration
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b border-brand-surface">
										<td className="px-5 py-3.5 text-brand-slate">Comment cookies (name/email/website)</td>
										<td className="px-5 py-3.5 text-brand-slate">1 year</td>
									</tr>
									<tr className="border-b border-brand-surface bg-brand-parchment/50">
										<td className="px-5 py-3.5 text-brand-slate">Login cookies</td>
										<td className="px-5 py-3.5 text-brand-slate">2 days (14 days with "Remember Me")</td>
									</tr>
									<tr className="border-b border-brand-surface">
										<td className="px-5 py-3.5 text-brand-slate">Session cookie</td>
										<td className="px-5 py-3.5 text-brand-slate">Discarded on browser close</td>
									</tr>
									<tr>
										<td className="px-5 py-3.5 text-brand-slate">Post-edit cookie</td>
										<td className="px-5 py-3.5 text-brand-slate">1 day</td>
									</tr>
								</tbody>
							</table>
						</div>
					</section>

					{/* Embedded Content */}
					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Embedded Content
						</h2>
						<p className="font-body text-sm leading-relaxed text-brand-slate">
							Pages on this site may include embedded content from other websites
							(e.g., videos, images, articles). Embedded content from other websites
							behaves in the exact same way as if the visitor has visited the other
							website directly. These websites may collect data about you, use cookies,
							embed additional third-party tracking, and monitor your interaction.
						</p>
					</section>

					{/* Data Retention */}
					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Data Retention
						</h2>
						<div className="space-y-3 font-body text-sm leading-relaxed text-brand-slate">
							<p>
								Comment data and associated metadata are retained indefinitely so
								follow-up comments can be recognized and approved automatically.
							</p>
							<p>
								Registered users can view, edit, or delete their personal information
								at any time (except usernames). Website administrators can also view
								and edit that information.
							</p>
						</div>
					</section>

					{/* Your Rights */}
					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Your Rights
						</h2>
						<div className="rounded-sm border border-brand-surface bg-brand-parchment p-5">
							<p className="font-body text-sm leading-relaxed text-brand-slate">
								If you have an account on this site or have left comments, you can
								request to receive an exported file of the personal data we hold about
								you. You can also request that we erase any personal data we hold
								about you. This does not include any data we are obliged to keep for
								administrative, legal, or security purposes.
							</p>
						</div>
					</section>

					{/* Third Parties */}
					<section>
						<h2 className="font-display text-xl font-bold text-brand-navy mb-4">
							Third-Party Services
						</h2>
						<p className="font-body text-sm leading-relaxed text-brand-slate">
							Visitor comments may be checked through an automated spam detection service.
						</p>
					</section>
				</div>
			</div>
		</main>
	);
}
```

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/routes/privacy-policy.tsx
git commit -m "feat: add Privacy Policy page"
```

---

### Task 18: Create Employee Services page

**Files:**
- Create: `src/routes/employee-services.tsx`

**Step 1: Create the route file**

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/employee-services")({
	component: EmployeeServicesPage,
});

const portals = [
	{
		name: "Skyward",
		description: "Financial and administrative system",
		url: "#",
	},
	{
		name: "Edison Employee Portal",
		description: "State employee hub",
		url: "https://hub.edison.tn.gov",
	},
	{
		name: "GOTOAssist Remote Support",
		description: "IT remote support access",
		url: "https://fastsupport.gotoassist.com",
	},
	{
		name: "Mark III Employee Benefits",
		description: "Benefits management portal",
		url: "https://mymarkiii.com/sullivancountytn",
	},
];

const resources = [
	"Medical and vision coverage (2025 rates available)",
	"Health plan comparison documents",
	"Open enrollment materials",
	"Employment application",
	"Title VI training video",
];

function EmployeeServicesPage() {
	return (
		<main className="py-14">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-4 h-px w-12 bg-brand-copper" />
				<h1 className="font-display text-4xl font-bold text-brand-navy mb-4 sm:text-5xl">
					Employee Services
				</h1>
				<p className="font-body text-brand-slate-light mb-14 max-w-2xl leading-relaxed">
					Access employee portals, benefits information, and resources for Sullivan County
					staff.
				</p>

				{/* Portals Grid */}
				<div className="mb-14">
					<h2 className="font-display text-xl font-bold text-brand-navy mb-6">
						Employee Portals
					</h2>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{portals.map((portal) => (
							<a
								key={portal.name}
								href={portal.url}
								target="_blank"
								rel="noopener noreferrer"
								className="card-lift group relative rounded-sm border border-brand-surface bg-white overflow-hidden"
							>
								<div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-copper scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
								<div className="p-5">
									<div className="flex items-center justify-between mb-1">
										<h3 className="font-display text-base font-bold text-brand-navy">
											{portal.name}
										</h3>
										<ExternalLink className="size-4 text-brand-warm-gray opacity-0 group-hover:opacity-100 transition-opacity" />
									</div>
									<p className="font-body text-sm text-brand-slate-light">
										{portal.description}
									</p>
								</div>
							</a>
						))}
					</div>
				</div>

				{/* Benefits & Resources */}
				<div className="rounded-sm border border-brand-surface bg-brand-parchment p-7">
					<h2 className="font-display text-xl font-bold text-brand-navy mb-5">
						Benefits &amp; Resources
					</h2>
					<ul className="space-y-2.5">
						{resources.map((resource) => (
							<li key={resource} className="flex items-start gap-3">
								<span className="mt-2.5 block h-1 w-1 shrink-0 rounded-full bg-brand-copper" />
								<span className="font-body text-sm text-brand-slate">{resource}</span>
							</li>
						))}
					</ul>
					<p className="mt-5 font-body text-sm text-brand-slate-light">
						For additional benefits information, visit{" "}
						<a
							href="https://www.tn.gov/partnersforhealth.html"
							target="_blank"
							rel="noopener noreferrer"
							className="text-brand-copper hover:text-brand-copper-light hover:underline font-medium"
						>
							Partners for Health
						</a>
						.
					</p>
				</div>
			</div>
		</main>
	);
}
```

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/routes/employee-services.tsx
git commit -m "feat: add Employee Services page with portals and benefits"
```

---

## Phase 6: Community Links & Navigation

### Task 19: Expand community links on Contact page

**Files:**
- Modify: `src/routes/contact.tsx`

**Step 1: Replace the `externalResources` array with the full 14 links from the scrape**

```ts
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
	{ label: "BidNet (Purchasing Bids)", url: "https://www.bidnetdirect.com/tennessee/sullivancountytn" },
	{ label: "State of Tennessee", url: "https://www.tn.gov/" },
	{ label: "County Technical Assistance Service", url: "http://www.ctas.tennessee.edu/" },
];
```

**Step 2: Update the section heading from "External Resources" to "Community Resources"**

Change the h2 text:
```tsx
<h2 className="font-display text-xl font-bold text-brand-navy mb-5">
	Community Resources
</h2>
```

**Step 3: Update the grid to 3 columns for the larger list**

Change `sm:grid-cols-2` to `sm:grid-cols-2 lg:grid-cols-3`.

**Step 4: Verify build**

Run: `npm run build`

---

### Task 20: Add Employee Services to SiteNav

**Files:**
- Modify: `src/components/layout/SiteNav.tsx:10-15` (NAV_LINKS array)

**Step 1: Add Employee Services to NAV_LINKS**

Add before "Contact":

```ts
const NAV_LINKS = [
	{ label: "Commissioners", href: "/commissioners" },
	{ label: "News", href: "/news" },
	{ label: "Documents", href: "/documents" },
	{ label: "Employee Services", href: "/employee-services" },
	{ label: "Contact", href: "/contact" },
] as const;
```

**Step 2: Verify build**

Run: `npm run build`

**Step 3: Commit all Phase 6 changes**

```bash
git add src/routes/contact.tsx src/components/layout/SiteNav.tsx
git commit -m "feat: expand community links to 14, add Employee Services to nav"
```

---

## Phase 7: Final Verification

### Task 21: Full build and visual verification

**Step 1: Run full build**

Run: `cd "/Users/codyboring/CodyML/projects/Sullivan County/site" && npm run build`
Expected: Build succeeds with zero errors

**Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors

**Step 3: Start dev server and verify pages**

Run: `npm run dev`

Verify these pages render correctly:
- `/departments/purchasing` — should show bid thresholds table + important notes
- `/departments/property-assessor` — should show FAQ + important notes
- `/departments/emergency-management` — should show meeting schedule + key documents
- `/departments/planning-and-codes` — should show key documents + important notes
- `/departments/county-clerk` — should show key documents
- `/departments/soil-water-conservation` — should show publications + notes
- `/departments/archives-and-tourism` — should show important notes
- `/commissioners` — should show expanded resources section
- `/ada-compliance` — new page renders
- `/privacy-policy` — new page renders
- `/employee-services` — new page with portal cards
- `/contact` — should show 14 community resource links

**Step 4: Final commit if any fixes needed**

**Step 5: Deploy**

Run: `npm run deploy`

---

## Summary

| Phase | Tasks | What It Does |
|-------|-------|-------------|
| 1 | Task 1 | Add interfaces + optional fields to Department type |
| 2 | Tasks 2-8 | Enrich 7 departments with rich scraped content |
| 3 | Tasks 9-14 | Add 6 new conditional sections to DepartmentDetail |
| 4 | Task 15 | Expand commissioners resources |
| 5 | Tasks 16-18 | Create 3 new pages (ADA, Privacy, Employee Services) |
| 6 | Tasks 19-20 | Expand community links, update nav |
| 7 | Task 21 | Build, lint, verify, deploy |

**Total: 21 tasks, ~8 files modified, ~3 files created**
