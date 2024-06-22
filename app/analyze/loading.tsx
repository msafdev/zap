export default function Loading() {
  return (
    <div className="flex flex-wrap items-center w-full justify-center gap-6 md:gap-8 pb-6 px-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-y-2"
        >
          <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
          <div className="w-20 h-3.5 rounded-sm bg-muted animate-pulse" />
        </div>
      ))}
    </div>

  );
}
