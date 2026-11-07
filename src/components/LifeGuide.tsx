import { Check, Mic, Moon, Star, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { stories } from "@/lib/stories";
import { useI18n } from "@/lib/i18n";
import { useExperience, voicePresets } from "@/lib/experience";
import { cn } from "@/lib/utils";

export function ModeToggle({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const { mode, setMode } = useExperience();
  const night = mode === "night";
  return <Button variant="secondary" size={compact ? "icon" : "sm"} aria-label={t.modeToggle} aria-pressed={night} onClick={() => setMode(night ? "day" : "night")}>
    {night ? <Moon size={17}/> : <Sun size={17}/>}{!compact && (night ? t.nightMode : t.dayMode)}
  </Button>;
}

export function ModesSection() {
  const { t } = useI18n();
  const { mode, setMode } = useExperience();
  const cards = [
    { id: "day" as const, icon: Sun, title: t.dayTitle, text: t.dayText, points: t.dayPoints, cls: "bg-secondary text-secondary-foreground" },
    { id: "night" as const, icon: Moon, title: t.nightTitle, text: t.nightText, points: t.nightPoints, cls: "bg-ink text-ink-foreground" },
  ];
  return <section id="modes" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
    <div className="text-center"><p className="text-sm font-semibold uppercase text-primary">{t.modesEyebrow}</p><h2 className="mt-2 text-3xl font-bold md:text-5xl">{t.modesTitle}</h2></div>
    <div className="mt-10 grid gap-6 md:grid-cols-2">{cards.map(({ id, icon: Icon, title, text, points, cls }) =>
      <div key={id} className={cn("rounded-2xl p-8 shadow-soft ring-offset-4 ring-offset-background", cls, mode === id && "ring-4 ring-primary")}>
        <Icon size={36}/><h3 className="mt-5 text-2xl font-bold">{title}</h3><p className="mt-3 leading-7 opacity-85">{text}</p>
        <ul className="mt-5 space-y-2 text-sm">{points.map((p) => <li key={p} className="flex items-center gap-2"><Check size={16}/>{p}</li>)}</ul>
        {mode !== id && <Button variant="light" className="mt-6" onClick={() => setMode(id)}>{t.tryMode}</Button>}
      </div>)}
    </div>
  </section>;
}

export function VoiceSection() {
  const { t } = useI18n();
  const { voice, setVoice } = useExperience();
  const preview = (id: (typeof voicePresets)[number]["id"]) => {
    setVoice(id);
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const p = voicePresets.find((v) => v.id === id)!;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance("Once upon a time, a little story was waiting just for you.");
    u.rate = p.rate; u.pitch = p.pitch; u.lang = "en-IN";
    window.speechSynthesis.speak(u);
  };
  return <section id="voices" className="bg-muted py-20"><div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
    <div><p className="text-sm font-semibold uppercase text-primary">{t.voiceEyebrow}</p><h2 className="mt-2 text-3xl font-bold md:text-5xl">{t.voiceTitle}</h2><p className="mt-5 max-w-lg leading-7 text-muted-foreground">{t.voiceText}</p></div>
    <div className="grid gap-3 sm:grid-cols-2">
      {voicePresets.map((v) => <button key={v.id} type="button" onClick={() => preview(v.id)} aria-pressed={voice === v.id}
        className={cn("flex items-center gap-4 rounded-2xl border-2 bg-popover p-5 text-left transition hover:-translate-y-1", voice === v.id ? "border-primary" : "border-transparent")}>
        <span className="text-4xl" aria-hidden>{v.emoji}</span><span><strong className="block">{t.voiceNames[v.id]}</strong><span className="text-xs text-muted-foreground">{t.voicePreview}</span></span>
        {voice === v.id && <Check className="ml-auto text-primary" size={20}/>}
      </button>)}
      <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-border p-5 sm:col-span-2"><Mic className="text-primary" size={28}/><span><strong className="block">{t.voiceRecord}</strong><span className="text-xs text-muted-foreground">{t.voiceSoon}</span></span></div>
    </div>
  </div></section>;
}

export function MoralQuest() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [stars, setStars] = useState(0);
  const story = stories[index % stories.length]!;
  const right = picked === story.quiz.answer;
  const choose = (i: number) => { if (picked === story.quiz.answer) return; setPicked(i); if (i === story.quiz.answer) setStars((s) => s + 1); };
  return <section id="quest" className="mx-auto max-w-4xl px-5 pb-20">
    <div className="rounded-2xl border-4 border-secondary bg-popover p-6 shadow-soft md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-semibold uppercase text-primary">{t.questEyebrow}</p><span className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground"><Star size={16} fill="currentColor"/>{stars} {t.stars}</span></div>
      <h2 className="mt-2 text-2xl font-bold md:text-4xl">{t.questTitle}</h2><p className="mt-2 text-sm text-muted-foreground">{t.questText} · {story.title}</p>
      <p className="mt-6 text-lg font-semibold">{story.quiz.question}</p>
      <div className="mt-4 grid gap-3">{story.quiz.options.map((o, i) =>
        <button key={o} type="button" onClick={() => choose(i)} className={cn("rounded-xl border-2 px-5 py-4 text-left font-medium transition hover:border-primary",
          picked === i ? (i === story.quiz.answer ? "border-leaf bg-leaf/15" : "border-accent bg-accent/15") : "border-border")}>{o}</button>)}
      </div>
      {picked !== null && <p className="mt-5 font-semibold" role="status">{right ? t.correct : t.tryAgain}</p>}
      {right && <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-secondary p-4 text-secondary-foreground"><span><strong>{t.moralLabel}:</strong> {story.moral}</span><Button size="sm" onClick={() => { setIndex(index + 1); setPicked(null); }}>→</Button></div>}
    </div>
  </section>;
}
