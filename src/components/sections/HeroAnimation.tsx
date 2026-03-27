"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ── Phase types ────────────────────────────────────────────────────────────────
// 0 = card at warehouse (resting)
// 1 = card travelling to site
// 2 = card at site (working)
// 3 = card returning to warehouse
type Phase = 0 | 1 | 2 | 3;

const PHASE_DURATIONS: Record<Phase, number> = {
  0: 900,   // pause at warehouse
  1: 1300,  // travel to site
  2: 1800,  // dwell at site
  3: 1100,  // return to warehouse
};

const CARD_X: Record<Phase, number> = {
  0: 108,   // right (warehouse side)
  1: -108,  // left  (site side) — framer-motion animates toward this
  2: -108,
  3: 108,
};

const CARD_LABELS: Record<Phase, { text: string; color: string }> = {
  0: { text: "ממתין לפריסה",   color: "#94a3b8" },
  1: { text: "בדרך לאתר",     color: "#16B7E8" },
  2: { text: "פעיל באתר",     color: "#10b981" },
  3: { text: "חוזר למחסן",    color: "#16B7E8" },
};

const TRAVEL_PHASES: Set<Phase> = new Set([1, 3]);

// ── Sub-icons ──────────────────────────────────────────────────────────────────
function WarehouseIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
      <rect x="4" y="20" width="40" height="24" rx="3" fill="#1A4A7A" stroke="#16B7E8" strokeWidth="1.5" />
      <path d="M2 22L24 6l22 16" stroke="#16B7E8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="17" y="28" width="14" height="16" rx="2" fill="#0D2B4E" stroke="#16B7E8" strokeWidth="1.2" />
      <circle cx="24" cy="35" r="2" fill="#16B7E8" />
    </svg>
  );
}

function SiteIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
      <rect x="6" y="14" width="36" height="30" rx="3" fill="#1A4A7A" stroke="#16B7E8" strokeWidth="1.5" />
      <rect x="6" y="8" width="24" height="10" rx="2" fill="#0D2B4E" stroke="#16B7E8" strokeWidth="1.2" />
      <rect x="10" y="26" width="8" height="8" rx="1" fill="#16B7E8" opacity="0.4" />
      <rect x="22" y="26" width="8" height="8" rx="1" fill="#16B7E8" opacity="0.4" />
      <rect x="16" y="34" width="10" height="10" rx="1" fill="#0D2B4E" stroke="#16B7E8" strokeWidth="1" />
      <circle cx="21" cy="39" r="1.5" fill="#16B7E8" />
    </svg>
  );
}

function DeviceIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

// ── Dashed path SVG ─────────────────────────────────────────────────────────
function PathLine() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
    >
      <line
        x1="68" y1="100"
        x2="332" y2="100"
        stroke="#16B7E8"
        strokeWidth="1.5"
        strokeDasharray="6 5"
        opacity="0.25"
      />
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function HeroAnimation() {
  const [phase, setPhase] = useState<Phase>(0);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;

    const tick = (current: Phase) => {
      const next = ((current + 1) % 4) as Phase;
      id = setTimeout(() => {
        setPhase(next);
        tick(next);
      }, PHASE_DURATIONS[current]);
    };

    tick(0);
    return () => clearTimeout(id);
  }, []);

  const label = CARD_LABELS[phase];
  const isTravel = TRAVEL_PHASES.has(phase);

  return (
    <div
      className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative select-none"
      style={{
        background: "linear-gradient(145deg, #06172B 0%, #0D2B4E 100%)",
        backgroundImage:
          "linear-gradient(145deg, #06172B 0%, #0D2B4E 100%), linear-gradient(to right, rgba(22,183,232,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,183,232,0.04) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 36px 36px, 36px 36px",
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(22,183,232,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,183,232,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Top bar — project chip */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
        <div className="bg-white/8 border border-brand-cyan/20 rounded-lg px-3 py-1.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
          <span className="text-xs text-white/80 font-medium">פרויקט ABC-2024 | יבשן תעשייתי</span>
        </div>
        <div className="bg-white/8 border border-brand-cyan/20 rounded-lg px-2 py-1 text-xs text-brand-cyan font-mono">
          ×3 יח&apos;
        </div>
      </div>

      {/* Stage area */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Path line behind everything */}
        <div className="absolute inset-0">
          <PathLine />
        </div>

        {/* Warehouse icon — physical right */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
          <div className="w-12 h-12">
            <WarehouseIcon />
          </div>
          <span className="text-[10px] text-brand-cyan/70 font-medium">מחסן</span>
        </div>

        {/* Site icon — physical left */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
          <div className="w-12 h-12">
            <SiteIcon />
          </div>
          <span className="text-[10px] text-brand-cyan/70 font-medium">אתר לקוח</span>
        </div>

        {/* Moving device card */}
        <motion.div
          className="absolute z-20"
          animate={{ x: CARD_X[phase] }}
          transition={{
            duration: isTravel ? (phase === 1 ? 1.1 : 0.9) : 0,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <div className="bg-white rounded-xl shadow-2xl border border-brand-cyan/20 p-3 w-32 text-center">
            {/* Device icon + animated label */}
            <div className="flex items-center justify-center mb-2 text-brand-primary">
              <DeviceIcon size={22} />
            </div>

            {/* Status dot + label */}
            <div className="flex items-center justify-center gap-1.5">
              <motion.span
                className="w-2 h-2 rounded-full shrink-0"
                animate={{ backgroundColor: label.color }}
                transition={{ duration: 0.35 }}
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase}
                  className="text-[10px] font-semibold text-brand-primary leading-tight"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {label.text}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Progress bar — visible at site (phase 2) */}
            <div className="mt-2.5 h-1 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-emerald-500"
                animate={{
                  width: phase === 2 ? "100%" : phase === 0 || phase === 3 ? "0%" : "0%",
                }}
                transition={{
                  duration: phase === 2 ? 1.4 : 0.15,
                  ease: "easeOut",
                  delay: phase === 2 ? 0.2 : 0,
                }}
              />
            </div>
          </div>

          {/* Checkmark badge — appears when at site and progress done */}
          <AnimatePresence>
            {phase === 2 && (
              <motion.div
                className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-md"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 1.5, duration: 0.3, type: "spring", stiffness: 300 }}
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom status strip */}
      <div className="absolute bottom-0 inset-x-0 bg-brand-dark/60 backdrop-blur-sm border-t border-brand-cyan/10 px-5 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            animate={{ backgroundColor: label.color }}
            transition={{ duration: 0.4 }}
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={`status-${phase}`}
              className="text-xs text-white/80 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {label.text}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="text-[10px] text-white/40 font-mono">03/2024</span>
      </div>
    </div>
  );
}
