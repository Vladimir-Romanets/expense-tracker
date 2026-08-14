const ProductsLoading = () => (
  <div className="animate-pulse">
    {/* Toolbar Skeleton */}
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="h-10 w-64 rounded-md bg-slate-200" />
      <div className="h-10 w-48 rounded-md bg-slate-200" />
    </div>

    {/* Table Skeleton */}
    <div className="w-full rounded-md border border-slate-200">
      <div className="flex h-12 items-center border-b border-slate-200 bg-slate-50 px-4">
        <div className="h-5 w-32 rounded bg-slate-200" />
      </div>

      <div className="flex flex-col">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex h-13.25 items-center gap-4 border-b border-slate-100 px-4 last:border-0"
          >
            <div className="flex-1">
              <div className="h-5 w-48 rounded bg-slate-200" />
            </div>
            <div className="w-32">
              <div className="h-5 w-24 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default ProductsLoading
