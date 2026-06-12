import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VEX — Shaping tomorrow with vision and action" },
      {
        name: "description",
        content: "We back visionaries and craft ventures that define what comes next.",
      },
      { property: "og:title", content: "VEX — Shaping tomorrow with vision and action" },
      {
        property: "og:description",
        content: "We back visionaries and craft ventures that define what comes next.",
      },
    ],
  }),
  component: Index,
});

function FadeIn({
  delay = 0,
  duration = 1000,
  children,
  className = "",
}: {
  delay?: number;
  duration?: number;
  children: ReactNode;
  className?: string;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        opacity: shown ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedHeading({
  text,
  initialDelay = 200,
  charDelay = 30,
  className = "",
  style,
}: {
  text: string;
  initialDelay?: number;
  charDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  const lines = text.split("\n");
  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {Array.from(line).map((ch, charIndex) => {
            const delay =
              lineIndex * line.length * charDelay + charIndex * charDelay;
            return (
              <span
                key={charIndex}
                style={{
                  display: "inline-block",
                  opacity: started ? 1 : 0,
                  transform: started ? "translateX(0)" : "translateX(-18px)",
                  transition: `opacity 500ms ease, transform 500ms ease`,
                  transitionDelay: `${delay}ms`,
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-10 flex min-h-screen flex-col px-6 md:px-12 lg:px-16 pt-6">
        <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
          <div className="text-2xl font-semibold tracking-tight">VEX</div>
          <div className="hidden md:flex items-center gap-8">
            {["Story", "Investing", "Building", "Advisory"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-sm transition-colors hover:text-gray-300"
              >
                {l}
              </a>
            ))}
          </div>
          <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100">
            Start a Chat
          </button>
        </nav>

        <div className="flex-1 flex flex-col justify-end pb-12 lg:pb-16 lg:grid lg:grid-cols-2 lg:items-end">
          <div>
            <AnimatedHeading
              text={"Shaping tomorrow\nwith vision and action."}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal mb-4 whitespace-nowrap"
              style={{ letterSpacing: "-0.04em" }}
            />
            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-5">
                We back visionaries and craft ventures that define what comes next.
              </p>
            </FadeIn>
            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-black px-8 py-3 rounded-lg font-medium">
                  Start a Chat
                </button>
                <button className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors hover:bg-white hover:text-black">
                  Explore Now
                </button>
              </div>
            </FadeIn>
          </div>

          <div className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light">
                  Investing. Building. Advisory.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
