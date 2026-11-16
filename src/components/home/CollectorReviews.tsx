import { motion } from "motion/react";
import { COLLECTOR_REVIEWS } from "@/src/data/catalog";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { EDITORIAL_EASE } from "@/src/lib/motion";

const STUDIO_PROOF_METRICS = [
  { value: "4,800+", label: "Private Walls Framed Since 2019" },
  { value: "4.97 / 5", label: "Average Collector Satisfaction" },
  { value: "120+ yrs", label: "Archival Pigment & Rag Rating" },
  { value: "5–7 Days", label: "Hand-Built SoHo Dispatch" },
];

export function CollectorReviews() {
  return (
    <section className="py-[var(--spacing-section)] bg-ivory hairline-b">
      <div className="editorial-container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <SectionLabel index="06" label="Collector & Designer Reviews" />
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal mt-4 leading-[1.03]">
              Trusted by{" "}
              <span className="italic text-olive">
                architects &amp; collectors.
              </span>
            </h2>
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-charcoal/55">
            Verified Atelier Commissions
          </p>
        </div>

        {/* 3 Attributable Collector Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {COLLECTOR_REVIEWS.map((review, idx) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.75,
                delay: idx * 0.1,
                ease: EDITORIAL_EASE,
              }}
              className="p-8 bg-beige/40 hairline-all flex flex-col justify-between"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-terracotta mb-5">
                  {review.commissionedPiece}
                </p>

                <blockquote className="font-serif text-xl sm:text-[22px] leading-[1.45] text-charcoal">
                  “{review.quote}”
                </blockquote>
              </div>

              <div className="mt-8 pt-5 hairline-t">
                <p className="text-sm font-medium text-charcoal">
                  {review.author}
                </p>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  {review.role} · {review.location}
                </p>
                <p className="text-[11px] text-olive mt-2.5 font-medium">
                  {review.outcomeMetric}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Adjacent 4-Column Quantitative Proof Strip */}
        <div className="mt-12 pt-10 hairline-t grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STUDIO_PROOF_METRICS.map((metric) => (
            <div key={metric.label}>
              <p className="font-serif text-3xl sm:text-4xl text-charcoal tabular-nums">
                {metric.value}
              </p>
              <p className="text-xs text-charcoal/60 mt-1.5">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
