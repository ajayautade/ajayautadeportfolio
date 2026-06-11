interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-12 sm:mb-16 lg:mb-20 w-full ${alignClass}`}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-lg text-text-secondary ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
