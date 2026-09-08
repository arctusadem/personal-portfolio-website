"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
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

const EasterEggEffects = dynamic(() => import("./easter-egg-effects"));
function subscribeMotionPreference(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getMotionPreference = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverMotionPreference = () => false;

function pruneHits(hits: number[], now: number, windowMs: number) {
  return hits.filter((value) => now - value < windowMs);
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName;
  return (
    target.isContentEditable ||
    tagName === "INPUT" ||
    tagName === "TEXTAREA" ||
    tagName === "SELECT"
  );
}

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribeMotionPreference,
    getMotionPreference,
    serverMotionPreference,
  );
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
    const timeoutId = window.setTimeout(() => {
      timeoutIdsRef.current = timeoutIdsRef.current.filter(
        (id) => id !== timeoutId,
      );
      callback();
    }, delay);
    timeoutIdsRef.current.push(timeoutId);
  }, []);

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
      timeoutIdsRef.current = [];
    };
  }, []);

  const pushToast = useCallback(
    (title: string, description: string) => {
      const id = toastIdRef.current++;
      setToasts((current) =>
        [...current, { id, title, description }].slice(-4),
      );
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

  const registerHit = useCallback(
    (ref: MutableRefObject<number[]>, threshold: number, windowMs: number) => {
      const now = Date.now();
      const next = [...pruneHits(ref.current, now, windowMs), now];
      ref.current = next;
      if (next.length >= threshold) {
        ref.current = [];
        return true;
      }
      return false;
    },
    [],
  );

  const registerLogoTap = useCallback(() => {
    if (registerHit(logoHitsRef, 6, 7000)) {
      activateTraceMode(
        "Trace mode enabled",
        "Six taps on the header mark opened the subtle diagnostics overlay.",
      );
    }
  }, [activateTraceMode, registerHit]);

  const registerChecksumTap = useCallback(() => {
    if (registerHit(checksumHitsRef, 6, 8000)) {
      runTimedMode(setChecksumMode, 8000);
      pushToast(
        "Checksum verified",
        "The trusted path is intact. The footer was not only decorative.",
      );
    }
  }, [pushToast, registerHit, runTimedMode]);

  const registerThemeToggle = useCallback(() => {
    if (registerHit(themeHitsRef, 6, 8000)) {
      runTimedMode(setParityMode, 9000);
      pushToast(
        "Parity lock acquired",
        "Six theme flips later, light and dark finally agree on the system state.",
      );
    }
  }, [pushToast, registerHit, runTimedMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.traceMode =
      traceMode && !reducedMotion ? "active" : "inactive";
    root.dataset.parityMode =
      parityMode && !reducedMotion ? "active" : "inactive";
    root.dataset.checksumMode =
      checksumMode && !reducedMotion ? "active" : "inactive";
  }, [checksumMode, parityMode, traceMode, reducedMotion]);

  useEffect(() => {
    if (bootedFromQueryRef.current) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get("trace") === "6") {
      bootedFromQueryRef.current = true;
      activateTraceMode(
        "Boot flag accepted",
        "Trace mode started directly from the URL with ?trace=6.",
      );
    }
  }, [activateTraceMode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setTraceMode(false);
        setKonamiMode(false);
        setSixBurstMode(false);
        setChecksumMode(false);
        setParityMode(false);
        setToasts([]);
        return;
      }

      if (
        isTypingTarget(event.target) ||
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      )
        return;

      const normalizedKey =
        event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const nextBuffer = [...keyBufferRef.current, normalizedKey].slice(
        -KONAMI_SEQUENCE.length,
      );
      keyBufferRef.current = nextBuffer;

      if (
        KONAMI_SEQUENCE.every((value, index) => nextBuffer[index] === value)
      ) {
        runTimedMode(setKonamiMode, 9000);
        pushToast(
          "Konami accepted",
          "Packet shower engaged. The site is intentionally leaking sixes for a moment.",
        );
        keyBufferRef.current = [];
      }

      if (normalizedKey === "6" && registerHit(sixHitsRef, 6, 5000)) {
        runTimedMode(setSixBurstMode, 8000);
        pushToast(
          "Hex field active",
          "Six presses on the 6 key woke up the background.",
        );
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
      {(traceMode ||
        konamiMode ||
        sixBurstMode ||
        checksumMode ||
        parityMode ||
        toasts.length > 0) && (
        <EasterEggEffects
          traceMode={traceMode}
          konamiMode={konamiMode}
          sixBurstMode={sixBurstMode}
          checksumMode={checksumMode}
          parityMode={parityMode}
          reducedMotion={reducedMotion}
          toasts={toasts}
        />
      )}
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
