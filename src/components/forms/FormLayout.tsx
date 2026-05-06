import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface FormLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function FormLayout({ title, description, children }: FormLayoutProps) {
  return (
    <main id="main-content" className="pt-24 pb-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/forms"
          className="inline-flex items-center gap-1.5 font-body text-sm text-brand-copper hover:text-brand-copper-light transition-colors mb-6"
        >
          <svg
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <title>Back</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          All Forms
        </Link>

        <div className="mb-4 h-px w-12 bg-brand-copper" />
        <h1 className="font-display text-3xl font-bold text-brand-navy mb-3 sm:text-4xl">
          {title}
        </h1>
        <p className="font-body text-brand-slate-light mb-10 leading-relaxed">{description}</p>

        {children}
      </div>
    </main>
  );
}
