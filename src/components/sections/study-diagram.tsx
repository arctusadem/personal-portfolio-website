import { ArrowDown, ArrowRight, Database, Radio } from "lucide-react";
import type { Project } from "@/types/content";

export function StudyDiagram({ project }: { project: Project }) {
  return (
    <figure className="diagram-grid rounded-3xl border border-[var(--border)] p-5 sm:p-8">
      <figcaption className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <span className="eyebrow">Proposed system boundaries</span>
        <span className="font-mono text-xs text-[var(--muted)]">
          sync / durable / async
        </span>
      </figcaption>
      <ol className="grid gap-3 md:grid-cols-3">
        {project.flow.map((node, index) => (
          <li key={node.name} className="relative">
            <div className="diagram-node h-full">
              <p className="mb-3 font-mono text-xs text-[var(--accent)]">
                0{index + 1}
              </p>
              <h3 className="font-semibold">{node.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {node.details}
              </p>
            </div>
            {index < 2 && (
              <ArrowRight
                aria-hidden
                className="absolute -right-3.5 top-1/2 z-10 hidden size-4 text-[var(--accent)] md:block"
              />
            )}
          </li>
        ))}
      </ol>
      <ArrowDown
        aria-hidden
        className="mx-auto my-4 size-4 text-[var(--accent)]"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[var(--accent)]/35 bg-[var(--accent-soft)] p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Database aria-hidden className="size-4" /> Durable boundary
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {project.durableBoundary}
          </p>
        </div>
        <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Radio aria-hidden className="size-4" /> Asynchronous work
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {project.asyncBoundary}
          </p>
        </div>
      </div>
      <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
        Logical boundaries, not a deployed topology. The interactive model below
        covers state transitions only.
      </p>
    </figure>
  );
}
