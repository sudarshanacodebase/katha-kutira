import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, Pause, Play, Square } from "lucide-react";
import { Button } from "@/components/Button";
import { stories } from "@/lib/stories";
import { useStoryNarration } from "@/hooks/use-story-narration";
import { LanguageSelect, useI18n } from "@/lib/i18n";
import { ModeToggle } from "@/components/LifeGuide";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = stories.find((item) => item.slug === params.slug);
    if (!story) throw notFound();
    return story;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.title} — Katha Kutira` : "Story not found — Katha Kutira" },
    { name: "description", content: loaderData?.description ?? "Discover another Indian story at Katha Kutira." },
    { property: "og:title", content: loaderData ? `${loaderData.title} — Katha Kutira` : "Story not found — Katha Kutira" },
    { property: "og:description", content: loaderData?.description ?? "Discover another Indian story at Katha Kutira." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: StoryPage,
});

function StoryPage() {
  const { t } = useI18n();
  const story = Route.useLoaderData();
  const { activeStory, isPaused, play, togglePause, stop } = useStoryNarration();
  const isActive = activeStory?.slug === story.slug;
  const related = stories.filter((item) => item.slug !== story.slug).slice(0, 2);
  return <main className="min-h-screen storybook-bg pb-20 text-foreground">
    <header className="border-b border-border bg-background"><div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 lg:px-8"><Button asChild variant="ghost" size="sm"><Link to="/"><ArrowLeft size={17}/>{t.back}</Link></Button><div className="flex items-center gap-2"><ModeToggle compact/><LanguageSelect/></div></div></header>
    <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><img src={story.artwork} width={768} height={1024} alt={`${t.coverFor} ${story.title}`} className="aspect-[3/4] w-full max-w-lg rounded-lg object-cover shadow-soft"/><div className="flex flex-col justify-center"><p className="text-sm font-semibold uppercase text-primary">{story.category} · {story.region}</p><h1 className="mt-3 text-4xl font-bold md:text-6xl">{story.title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{story.description}</p><div className="mt-8 flex flex-wrap gap-2">{[story.ageGroup, story.language, story.duration, ...story.themes].map((item) => <span className="rounded-full border border-border bg-popover px-4 py-2 text-xs font-semibold" key={item}>{item}</span>)}</div><p className="mt-7 text-sm"><span className="text-muted-foreground">{t.narratedBy}</span> <strong>{story.narrator}</strong></p><div className="mt-8 flex flex-wrap gap-3"><Button onClick={() => (isActive ? togglePause() : play(story))}>{isActive && !isPaused ? <Pause size={18}/> : <Play size={18} fill="currentColor"/>}{isActive && isPaused ? t.resume : isActive ? t.pause : t.playStory}</Button>{isActive && <Button variant="secondary" onClick={stop}><Square size={16}/>{t.stop}</Button>}<Button variant="secondary" size="icon" aria-label={t.favStory}><Heart size={18}/></Button></div><p className="mt-8 rounded-xl bg-secondary p-4 text-sm font-semibold text-secondary-foreground">⭐ {t.moralLabel}: {story.moral}</p><div className="mt-10 border-t border-border pt-6"><h2 className="font-bold">{t.characters}</h2><p className="mt-2 text-sm text-muted-foreground">{story.characters.join(" · ")}</p></div><div className="mt-10 border-t border-border pt-6"><h2 className="font-bold">{t.readAlong}</h2><p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-7 text-muted-foreground">{story.storyText}</p></div></div></section>
    <section className="bg-popover py-16"><div className="mx-auto max-w-7xl px-5 lg:px-8"><h2 className="text-3xl font-bold">{t.more}</h2><div className="mt-8 grid gap-5 sm:grid-cols-2">{related.map((item) => <Link key={item.slug} to="/stories/$slug" params={{ slug: item.slug }} className="grid grid-cols-[110px_1fr] overflow-hidden rounded-lg border border-border bg-background"><img src={item.artwork} alt="" className="h-full w-full object-cover"/><div className="p-5"><span className="text-xs font-semibold text-primary">{item.category}</span><h3 className="mt-2 font-bold">{item.title}</h3><p className="mt-2 text-xs text-muted-foreground">{item.duration} · {item.language}</p></div></Link>)}</div></div></section>
  </main>;
}