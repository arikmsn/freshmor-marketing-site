import Image from "next/image";

interface PhoneFrameProps {
  src: string;
  alt: string;
  /** Set true only for the above-the-fold screenshot (hero). */
  priority?: boolean;
  /** Extra Tailwind classes applied to the outermost wrapper div. */
  className?: string;
}

/**
 * A reusable smartphone frame that wraps a screenshot with next/image.
 *
 * Design:
 *  - Very dark navy shell (#0f172a) with a subtle white/10 ring — looks great
 *    on both the dark hero background and lighter section backgrounds.
 *  - Dynamic-island-style notch pill at top.
 *  - Power + volume side buttons (decorative).
 *  - Home indicator bar at the bottom.
 *  - Screen area uses aspect-[9/14] with object-cover to fill naturally.
 *
 * The component is purely presentational (no "use client" needed).
 */
export default function PhoneFrame({
  src,
  alt,
  priority = false,
  className = "",
}: PhoneFrameProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* ── Shell ───────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-[44px] p-[5px]"
        style={{
          background: "#0f172a",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.08), 0 24px 64px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35)",
        }}
      >
        {/* Side buttons — left (volume) */}
        <div className="absolute left-[-3px] top-[88px] w-[3px] h-[28px] rounded-l-sm bg-[#1e293b]" />
        <div className="absolute left-[-3px] top-[124px] w-[3px] h-[28px] rounded-l-sm bg-[#1e293b]" />
        {/* Side buttons — right (power) */}
        <div className="absolute right-[-3px] top-[108px] w-[3px] h-[40px] rounded-r-sm bg-[#1e293b]" />

        {/* ── Screen area ─────────────────────────────────────────────── */}
        <div className="relative rounded-[40px] overflow-hidden aspect-[9/14] bg-slate-900">
          {/* Dynamic island notch */}
          <div
            className="absolute top-[10px] left-1/2 -translate-x-1/2 z-10 rounded-full bg-black"
            style={{ width: "72px", height: "22px" }}
          />

          {/* Screenshot */}
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 200px, 280px"
            className="object-cover"
            priority={priority}
          />
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pt-[6px] pb-[2px]">
          <div
            className="rounded-full"
            style={{ width: "72px", height: "4px", background: "rgba(255,255,255,0.18)" }}
          />
        </div>
      </div>
    </div>
  );
}
