export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-auto grow w-full py-8 pad-x">
      <div className="flex flex-col w-full max-w-2xl text-center gap-y-4">
        <h3 className="text-sm md:text-base font-semibold">Analyzing...</h3>

        <div className="w-full flex flex-col border rounded-xl">
          <div className="w-full pt-4 pb-6 px-4 border-b flex flex-col gap-y-5 items-center">
            <div className="w-40 h-10 bg-muted animate-pulse rounded-md" />
            <div className="flex flex-wrap items-center w-full justify-center gap-6 md:gap-8">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-y-2"
                >
                  <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
                  <div className="w-20 h-3 rounded-md bg-muted animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
