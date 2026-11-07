import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Mode = "day" | "night";
export type VoiceId = "storyteller" | "grandma" | "papa" | "friend";

/** Personalised narration presets. Pitch/rate shape the browser voice. */
export const voicePresets: { id: VoiceId; emoji: string; rate: number; pitch: number }[] = [
  { id: "storyteller", emoji: "📖", rate: 0.88, pitch: 1.02 },
  { id: "grandma", emoji: "👵", rate: 0.78, pitch: 1.2 },
  { id: "papa", emoji: "👨", rate: 0.86, pitch: 0.8 },
  { id: "friend", emoji: "🧒", rate: 1, pitch: 1.4 },
];

type Ctx = { mode: Mode; setMode: (m: Mode) => void; voice: VoiceId; setVoice: (v: VoiceId) => void };
const ExperienceContext = createContext<Ctx>({ mode: "day", setMode: () => {}, voice: "storyteller", setVoice: () => {} });

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("day");
  const [voice, setVoiceState] = useState<VoiceId>("storyteller");
  useEffect(() => {
    const m = localStorage.getItem("katha-mode");
    if (m === "day" || m === "night") setModeState(m);
    const v = localStorage.getItem("katha-voice") as VoiceId | null;
    if (v && voicePresets.some((p) => p.id === v)) setVoiceState(v);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle("dark", mode === "night"); }, [mode]);
  const setMode = (m: Mode) => { setModeState(m); localStorage.setItem("katha-mode", m); };
  const setVoice = (v: VoiceId) => { setVoiceState(v); localStorage.setItem("katha-voice", v); };
  return <ExperienceContext.Provider value={{ mode, setMode, voice, setVoice }}>{children}</ExperienceContext.Provider>;
}

export const useExperience = () => useContext(ExperienceContext);
