/**
 * U7 — Section Skeleton
 * Shown while React.lazy sections load. Matches the app's dark aesthetic.
 */
export function SectionSkeleton({ height = "500px" }: { height?: string }) {
  return (
    <div
      className="w-full animate-pulse bg-surface border-y border-hazard/5"
      style={{ height }}
      aria-hidden="true"
    >
      <div className="mx-auto w-[min(1520px,100%-2rem)] px-4 py-16 flex flex-col gap-4">
        <div className="h-2.5 w-20 rounded-full bg-surface2" />
        <div className="h-8 w-64 rounded-lg bg-surface2" />
        <div className="h-4 w-96 max-w-full rounded bg-surface2 opacity-60" />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-surface2" />
          ))}
        </div>
      </div>
    </div>
  );
}
