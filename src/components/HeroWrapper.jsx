export default function HeroWrapper({
  backgroundImage,
  children,
}) {
  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden">
      {/* Background image */}
      {backgroundImage && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/70 to-slate-700/80" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
