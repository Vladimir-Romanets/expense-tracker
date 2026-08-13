const skeletonCards = Array.from({ length: 4 })

const CategoriesLoader = () => (
  <ul className="grid animate-pulse grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-4">
    {skeletonCards.map((_, index) => (
      <li
        key={index}
        className="relative w-full rounded-xl border border-surface-border bg-white p-3 md:p-6"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="size-24 rounded-2xl bg-slate-200" />

          <div className="h-5 w-3/4 rounded bg-slate-200" />

          <div className="flex w-full flex-col gap-2">
            <div className="h-3 w-full rounded bg-slate-200" />
            <div className="h-3 w-5/6 rounded bg-slate-200" />
            <div className="h-3 w-2/3 rounded bg-slate-200" />
          </div>
        </div>
      </li>
    ))}
  </ul>
)
export default CategoriesLoader
