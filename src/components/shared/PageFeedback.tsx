import { useRouterState } from "@tanstack/react-router";
import { Check, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { createIdempotencyKey } from "~/lib/receipts";
import { submitPageFeedback } from "~/server/page-feedback";

type Phase = "ask" | "comment" | "thanks";

export function PageFeedback() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [phase, setPhase] = useState<Phase>("ask");
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState(() => createIdempotencyKey("feedback"));
  const [receiptId, setReceiptId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function send(value: boolean, withComment?: string) {
    setSubmitting(true);
    try {
      const result = await submitPageFeedback({
        data: { page: pathname, helpful: value, idempotencyKey, comment: withComment || undefined },
      });
      setReceiptId(result.receiptId);
      setIdempotencyKey(createIdempotencyKey("feedback"));
      setPhase("thanks");
    } catch {
      // Silent fail — don't disrupt the citizen.
      setPhase("thanks");
    } finally {
      setSubmitting(false);
    }
  }

  function handleClick(value: boolean) {
    // Defer the actual submit until the citizen finishes the comment phase
    // (or skips it). One vote = one D1 row.
    setHelpful(value);
    setPhase("comment");
  }

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (helpful === null) return;
    await send(helpful, comment.trim() || undefined);
  }

  async function handleSkip() {
    if (helpful === null) {
      setPhase("thanks");
      return;
    }
    await send(helpful);
  }

  return (
    <section
      aria-labelledby="page-feedback-heading"
      className="mt-12 rounded-sm border border-brand-surface bg-brand-parchment/60 p-5 sm:p-6"
    >
      {phase === "ask" && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="page-feedback-heading"
            className="font-display text-base font-bold text-brand-navy"
          >
            Was this page helpful?
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleClick(true)}
              className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/15 bg-white px-4 py-2 font-body text-sm font-medium text-brand-navy hover:border-brand-sage/50 hover:bg-brand-sage/5 transition-colors min-h-[44px]"
            >
              <ThumbsUp aria-hidden="true" className="size-4" />
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleClick(false)}
              className="inline-flex items-center gap-2 rounded-sm border border-brand-navy/15 bg-white px-4 py-2 font-body text-sm font-medium text-brand-navy hover:border-brand-copper/50 hover:bg-brand-copper/5 transition-colors min-h-[44px]"
            >
              <ThumbsDown aria-hidden="true" className="size-4" />
              No
            </button>
          </div>
        </div>
      )}

      {phase === "comment" && (
        <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
          <h2
            id="page-feedback-heading"
            className="font-display text-base font-bold text-brand-navy"
          >
            Thanks. Tell us more (optional).
          </h2>
          <p className="font-body text-sm text-brand-slate-light">
            What were you looking for? Your message goes only to county staff.
          </p>
          <label htmlFor="page-feedback-comment" className="sr-only">
            Optional page feedback comment
          </label>
          <Textarea
            id="page-feedback-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            maxLength={1000}
            placeholder="Optional"
          />
          <div className="flex flex-wrap gap-2">
            <Button type="submit" variant="navy" disabled={submitting}>
              {submitting ? "Sending…" : "Send"}
            </Button>
            <Button type="button" variant="outline" onClick={handleSkip} disabled={submitting}>
              Skip
            </Button>
          </div>
        </form>
      )}

      {phase === "thanks" && (
        <div className="flex items-center gap-3 font-body text-sm text-brand-slate">
          <Check aria-hidden="true" className="size-5 text-brand-sage" />
          <span>
            Thanks for the feedback.
            {receiptId ? <span className="ml-1 font-mono">Receipt {receiptId}</span> : null}
          </span>
        </div>
      )}
    </section>
  );
}
