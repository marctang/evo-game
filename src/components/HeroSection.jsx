const HEIGHTS = {
  large: "min-h-[85vh]",
  medium: "min-h-[55vh]",
  small: "min-h-[40vh]",
};

export default function HeroSection({
  eyebrow,
  title,
  subtitle,
  align = "center",
  size = "large",
}) {
  const isCenter = align === "center";

  return (
    <div className={`w-full ${HEIGHTS[size] || HEIGHTS.large} flex items-center py-16`}>
      <div className={`w-full px-6 ${isCenter ? "text-center" : "text-left"}`}>
        <div className="mx-auto max-w-5xl">
          {eyebrow && (
            <p className="mb-5 text-xs font-semibold tracking-widest uppercase text-amber-300">
              {eyebrow}
            </p>
          )}

          <h1 className="font-display mb-6 text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight text-white">
            {title}
          </h1>

          {subtitle && (
            <p className="mx-auto max-w-3xl text-lg sm:text-xl xl:text-2xl text-slate-200">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
