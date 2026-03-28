"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject, ReactNode } from "react";

type EasterEggContextValue = {
  registerLogoTap: () => void;
  registerChecksumTap: () => void;
  registerThemeToggle: () => void;
};

type EggToast = {
  id: number;
  title: string;
  description: string;
};

const EasterEggContext = createContext<EasterEggContextValue | null>(null);

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const FLOATING_SIXES = [
  { left: "8%", top: "12%", delay: 0 },
  { left: "18%", top: "28%", delay: 0.12 },
  { left: "29%", top: "14%", delay: 0.18 },
  { left: "41%", top: "34%", delay: 0.26 },
  { left: "56%", top: "16%", delay: 0.08 },
  { left: "68%", top: "29%", delay: 0.22 },
  { left: "82%", top: "18%", delay: 0.14 },
  { left: "12%", top: "58%", delay: 0.3 },
  { left: "26%", top: "70%", delay: 0.24 },
  { left: "39%", top: "61%", delay: 0.32 },
  { left: "52%", top: "74%", delay: 0.1 },
  { left: "67%", top: "64%", delay: 0.28 },
  { left: "81%", top: "72%", delay: 0.16 },
  { left: "90%", top: "54%", delay: 0.34 },
];

function pruneHits(hits: number[], now: number, windowMs: number) {
  return hits.filter((value) => now - value < windowMs);
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName;
  return target.isContentEditable || tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";
}

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [traceMode, setTraceMode] = useState(false);
  const [konamiMode, setKonamiMode] = useState(false);
  const [sixBurstMode, setSixBurstMode] = useState(false);
  const [checksumMode, setChecksumMode] = useState(false);
  const [parityMode, setParityMode] = useState(false);
  const [toasts, setToasts] = useState<EggToast[]>([]);

  const bootedFromQueryRef = useRef(false);
  const keyBufferRef = useRef<string[]>([]);
  const sixHitsRef = useRef<number[]>([]);
  const logoHitsRef = useRef<number[]>([]);
  const checksumHitsRef = useRef<number[]>([]);
  const themeHitsRef = useRef<number[]>([]);
  const toastIdRef = useRef(1);
  const timeoutIdsRef = useRef<number[]>([]);

  const queueTimeout = useCallback((callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(callback, delay);
    timeoutIdsRef.current.push(timeoutId);
  }, []);

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIdsRef.current = [];
    };
  }, []);

  const pushToast = useCallback(
    (title: string, description: string) => {
      const id = toastIdRef.current++;
      setToasts((current) => [...current, { id, title, description }].slice(-4));
      queueTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 4200);
    },
    [queueTimeout],
  );

  const runTimedMode = useCallback(
    (setter: (value: boolean) => void, durationMs: number) => {
      setter(true);
      queueTimeout(() => setter(false), durationMs);
    },
    [queueTimeout],
  );

  const activateTraceMode = useCallback(
    (title: string, description: string) => {
      runTimedMode(setTraceMode, 12000);
      pushToast(title, description);
    },
    [pushToast, runTimedMode],
  );

  const registerHit = useCallback((ref: MutableRefObject<number[]>, threshold: number, windowMs: number) => {
    const now = Date.now();
    const next = [...pruneHits(ref.current, now, windowMs), now];
    ref.current = next;
    if (next.length >= threshold) {
      ref.current = [];
      return true;
    }
    return false;
  }, []);

  const registerLogoTap = useCallback(() => {
    if (registerHit(logoHitsRef, 6, 7000)) {
      activateTraceMode("Trace mode enabled", "Six taps on the header mark opened the subtle diagnostics overlay.");
    }
  }, [activateTraceMode, registerHit]);

  const registerChecksumTap = useCallback(() => {
    if (registerHit(checksumHitsRef, 6, 8000)) {
      runTimedMode(setChecksumMode, 8000);
      pushToast("Checksum verified", "The trusted path is intact. The footer was not only decorative.");
    }
  }, [pushToast, registerHit, runTimedMode]);

  const registerThemeToggle = useCallback(() => {
    if (registerHit(themeHitsRef, 6, 8000)) {
      runTimedMode(setParityMode, 9000);
      pushToast("Parity lock acquired", "Six theme flips later, light and dark finally agree on the system state.");
    }
  }, [pushToast, registerHit, runTimedMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.traceMode = traceMode ? "active" : "inactive";
    root.dataset.parityMode = parityMode ? "active" : "inactive";
    root.dataset.checksumMode = checksumMode ? "active" : "inactive";
  }, [checksumMode, parityMode, traceMode]);

  useEffect(() => {
    if (bootedFromQueryRef.current) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get("trace") === "6") {
      bootedFromQueryRef.current = true;
      activateTraceMode("Boot flag accepted", "Trace mode started directly from the URL with ?trace=6.");
    }
  }, [activateTraceMode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) {
        return;
      }

      if (event.key === "Escape") {
        setTraceMode(false);
        setKonamiMode(false);
        setSixBurstMode(false);
        setChecksumMode(false);
        setParityMode(false);
        setToasts([]);
        return;
      }

      const normalizedKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const nextBuffer = [...keyBufferRef.current, normalizedKey].slice(-KONAMI_SEQUENCE.length);
      keyBufferRef.current = nextBuffer;

      if (KONAMI_SEQUENCE.every((value, index) => nextBuffer[index] === value)) {
        runTimedMode(setKonamiMode, 9000);
        pushToast("Konami accepted", "Packet shower engaged. The site is intentionally leaking sixes for a moment.");
        keyBufferRef.current = [];
      }

      if (normalizedKey === "6" && registerHit(sixHitsRef, 6, 5000)) {
        runTimedMode(setSixBurstMode, 8000);
        pushToast("Hex field active", "Six presses on the 6 key woke up the background.");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pushToast, registerHit, runTimedMode]);

  const contextValue = useMemo(
    () => ({
      registerLogoTap,
      registerChecksumTap,
      registerThemeToggle,
    }),
    [registerChecksumTap, registerLogoTap, registerThemeToggle],
  );

  return (
    <EasterEggContext.Provider value={contextValue}>
      {children}

      <AnimatePresence>
        {traceMode ? (
          <motion.div
            key="trace-mode"
            className="pointer-events-none fixed inset-0 z-[65]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute left-5 top-5 rounded-full border border-[var(--accent)]/40 bg-[var(--surface)]/88 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)] shadow-[0_20px_45px_-30px_var(--shadow-color)] sm:left-8 sm:top-8">
              trace.mode = 0x06
            </div>
            <div className="absolute bottom-5 right-5 rounded-full border border-[var(--accent)]/40 bg-[var(--surface)]/88 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)] shadow-[0_20px_45px_-30px_var(--shadow-color)] sm:bottom-8 sm:right-8">
              idempotency.check = pass
            </div>
            <div className="absolute inset-5 rounded-[2rem] border border-dashed border-[var(--accent)]/30 sm:inset-8" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {konamiMode || sixBurstMode ? (
          <motion.div
            key={konamiMode ? "konami" : "six-burst"}
            className="pointer-events-none fixed inset-0 z-[64] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {FLOATING_SIXES.map((entry, index) => (
              <motion.span
                key={`${entry.left}-${entry.top}-${index}`}
                className="absolute font-mono text-3xl font-semibold text-[color-mix(in_oklab,var(--accent)_72%,white_18%)] sm:text-5xl"
                style={{ left: entry.left, top: entry.top }}
                initial={{ opacity: 0, y: 12, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  y: [-14, -54, -92],
                  scale: [0.86, 1, 1.08],
                  rotate: [0, konamiMode ? 12 : 6, konamiMode ? -8 : -4],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: konamiMode ? 4.8 : 3.8, delay: entry.delay, ease: "easeOut" }}
              >
                {index % 3 === 0 ? "0x06" : "6"}
              </motion.span>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {checksumMode ? (
          <motion.div
            key="checksum-badge"
            className="pointer-events-none fixed bottom-6 left-1/2 z-[63] -translate-x-1/2"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
          >
            <div className="rounded-full border border-[var(--accent)]/45 bg-[var(--surface)]/92 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)] shadow-[0_20px_45px_-30px_var(--shadow-color)]">
              checksum.valid / route.ca.fintech / 06
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {parityMode ? (
          <motion.div
            key="parity-badge"
            className="pointer-events-none fixed right-6 top-24 z-[63]"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 18 }}
          >
            <div className="rounded-3xl border border-[var(--accent)]/45 bg-[var(--surface)]/92 px-4 py-3 shadow-[0_20px_45px_-30px_var(--shadow-color)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">parity.lock</p>
              <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">Theme state survived six flips.</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div aria-live="polite" className="pointer-events-none fixed right-4 top-24 z-[70] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3 sm:right-6">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 18, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 18, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="rounded-[1.6rem] border border-[var(--border-strong)] bg-[var(--surface)]/96 p-4 shadow-[0_20px_45px_-30px_var(--shadow-color)] backdrop-blur-xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">hidden.route / 06</p>
                <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{toast.title}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{toast.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </EasterEggContext.Provider>
  );
}

export function useEasterEggs() {
  const value = useContext(EasterEggContext);

  if (!value) {
    return {
      registerLogoTap: () => undefined,
      registerChecksumTap: () => undefined,
      registerThemeToggle: () => undefined,
    };
  }

  return value;
}

