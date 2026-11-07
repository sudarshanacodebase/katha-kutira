import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Moon, Pause, Play, Search, Sparkles, Volume2, X } from "lucide-react";
import { useMemo, useState } from "react";
import heroImage from "@/assets/katha-hero.jpg";
import appHomeDesktop from "@/assets/app-home-desktop.jpg";
import appHomeMobile from "@/assets/app-home-mobile.jpg";
import appStoryDetail from "@/assets/app-story-detail.jpg";
import { Button } from "@/components/Button";
import { categories, stories } from "@/lib/stories";
import { LanguageSelect, useI18n } from "@/lib/i18n";
import { useStoryNarration } from "@/hooks/use-story-narration";
import { ModeToggle, MoralQuest, ModesSection, VoiceSection } from "@/components/LifeGuide";
import { useExperience } from "@/lib/experience";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Katha Kutira — Moral Stories & Life Lessons for Kids" },
    { name: "description", content: "A moral life guide for children: Indian stories with simple lessons, playful quests by day and calm audio by night, in personalised voices." },
    { property: "og:title", content: "Katha Kutira — Moral Stories & Life Lessons for Kids" },
    { property: "og:description", content: "Little stories, big life lessons — interactive by day, audio-only by night." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Logo() {
  return <Link to="/" className="flex items-center gap-2 font-bold text-foreground"><span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-lg text-primary-foreground">क</span><span>Katha Kutira</span></Link>;
}

function Index() {
  const { t } = useI18n();
  const { mode } = useExperience();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All languages");
  const [age, setAge] = useState("All ages");
  const { activeStory, isPaused, play, togglePause, stop } = useStoryNarration();
  const [favorites, setFavorites] = useState<string[]>([]);
  const filtered = useMemo(() => stories.filter((story) =>
    (!query || `${story.title} ${story.category} ${story.themes.join(" ")}`.toLowerCase().includes(query.toLowerCase())) &&
    (language === "All languages" || story.language === language) &&
    (age === "All ages" || story.ageGroup.startsWith(age))), [age, language, query]);

  const toggleFavorite = (slug: string) => setFavorites((items) => items.includes(slug) ? items.filter((item) => item !== slug) : [...items, slug]);

  return <div className="min-h-screen overflow-x-hidden storybook-bg pb-24 text-foreground">
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-5 lg:flex lg:justify-between lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex" aria-label="Main navigation">
          <a href="#stories" className="hover:text-primary">{t.navStories}</a><a href="#categories" className="hover:text-primary">{t.navCategories}</a><a href="#journey" className="hover:text-primary">{t.navJourney}</a><a href="#parents" className="hover:text-primary">{t.navParents}</a>
        </nav>
        <div className="hidden items-center gap-2 lg:flex"><ModeToggle/><LanguageSelect/><Button variant="ghost" size="icon" aria-label={t.searchStories} onClick={() => document.getElementById("story-search")?.focus()}><Search size={19}/></Button><Button size="sm" onClick={() => { const firstStory = stories[0]; if (firstStory) play(firstStory); }}><Play size={16} fill="currentColor"/>{t.listenNow}</Button></div>
        <div className="flex items-center gap-1 lg:hidden"><ModeToggle compact/><LanguageSelect/></div><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={t.toggleNav}>{menuOpen ? <X/> : <Menu/>}</Button>
      </div>
      {menuOpen && <nav className="grid gap-1 border-t border-border bg-background p-4 lg:hidden"><a href="#stories" className="rounded-md px-3 py-3" onClick={() => setMenuOpen(false)}>{t.navStories}</a><a href="#categories" className="rounded-md px-3 py-3" onClick={() => setMenuOpen(false)}>{t.navCategories}</a><a href="#journey" className="rounded-md px-3 py-3" onClick={() => setMenuOpen(false)}>{t.navJourney}</a><a href="#parents" className="rounded-md px-3 py-3" onClick={() => setMenuOpen(false)}>{t.navParents}</a></nav>}
    </header>

    <main>
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-secondary/60 blur-3xl"/>
        <div aria-hidden className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl"/>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-secondary-foreground"><Sparkles size={15}/> {t.heroEyebrow}</p>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl xl:text-7xl">{t.heroTitle1}<br/><span className="text-primary">{t.heroTitle2}</span></h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground md:text-lg">{t.heroText}</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {[["⭐", t.heroPillar1, "bg-secondary text-secondary-foreground"], ["🎙️", t.heroPillar2, "bg-primary text-primary-foreground"], ["☀️🌙", t.heroPillar3, "bg-accent text-accent-foreground"]].map(([icon, label, cls]) => <li key={label} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${cls}`}><span className="text-base" aria-hidden>{icon}</span>{label}</li>)}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild><a href="#stories">{t.exploreStories}</a></Button><Button variant="secondary" onClick={() => { const firstStory = stories[0]; if (firstStory) play(firstStory); }}><Play size={17} fill="currentColor"/>{t.listenStory}</Button></div>
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{t.getApp}</span>
              <a href="#" aria-label="Download Katha Kutira on Google Play" className="flex items-center gap-2.5 rounded-md border border-border bg-popover px-4 py-2 transition hover:border-primary">
                <svg viewBox="0 0 512 512" className="h-6 w-6 text-foreground" fill="currentColor" aria-hidden><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                <span className="text-left leading-tight"><span className="block text-[10px] uppercase tracking-wide text-muted-foreground">{t.getItOn}</span><span className="block text-sm font-semibold text-foreground">Google Play</span></span>
              </a>
              <a href="#" aria-label="Download Katha Kutira on the App Store" className="flex items-center gap-2.5 rounded-md border border-border bg-popover px-4 py-2 transition hover:border-primary">
                <svg viewBox="0 0 384 512" className="h-6 w-6 text-foreground" fill="currentColor" aria-hidden><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                <span className="text-left leading-tight"><span className="block text-[10px] uppercase tracking-wide text-muted-foreground">{t.downloadOn}</span><span className="block text-sm font-semibold text-foreground">App Store</span></span>
              </a>
            </div>

          </div>
          <div className="relative mx-auto w-full max-w-2xl">
            <img src={heroImage} width={1536} height={1024} alt="Children and forest friends listening to a story outside a glowing cottage" className="aspect-[4/5] w-full rounded-[2rem] lg:aspect-[5/6] border-8 border-popover object-cover object-[62%_center] shadow-soft" fetchPriority="high"/>
            <div className="absolute -left-4 top-8 max-w-[15rem] rotate-[-3deg] rounded-2xl bg-popover p-4 shadow-soft md:-left-10"><p className="text-xs font-bold uppercase text-primary">{t.moralLabel}</p><p className="mt-1 text-sm font-semibold">⭐ {stories[0]?.moral}</p></div>
            <div className="absolute -right-3 bottom-10 rotate-[3deg] rounded-2xl bg-ink p-4 text-ink-foreground shadow-soft md:-right-8"><p className="flex items-center gap-2 text-sm font-bold"><Moon size={16}/>{t.nightTitle}</p></div>
          </div>
        </div>
      </section>

      <section id="stories" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-sm font-semibold uppercase text-primary">{t.storiesEyebrow}</p><h2 className="mt-2 text-3xl font-bold md:text-5xl">{t.storiesTitle}</h2></div><p className="max-w-md text-muted-foreground">{t.storiesText}</p></div>
        <div className="mb-10 grid gap-3 rounded-lg border border-border bg-popover p-4 shadow-soft md:grid-cols-[minmax(0,1.7fr)_repeat(2,minmax(150px,0.65fr))]">
          <label className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18}/><span className="sr-only">{t.searchStories}</span><input id="story-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.searchPlaceholder} className="h-12 w-full rounded-md border border-border bg-background pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"/></label>
          <label><span className="sr-only">{t.filterLanguage}</span><select value={language} onChange={(e) => setLanguage(e.target.value)} className="h-12 w-full rounded-md border border-border bg-background px-4 text-sm"><option value="All languages">{t.allLanguages}</option><option value="English">{t.english}</option><option value="Hindi">{t.hindi}</option></select></label>
          <label><span className="sr-only">{t.filterAge}</span><select value={age} onChange={(e) => setAge(e.target.value)} className="h-12 w-full rounded-md border border-border bg-background px-4 text-sm"><option value="All ages">{t.allAges}</option><option>5</option><option>6</option><option>7</option></select></label>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((story) => <article key={story.slug} className="group overflow-hidden rounded-lg bg-popover shadow-soft"><div className="relative aspect-[4/3] overflow-hidden"><img src={story.artwork} width={768} height={1024} loading="lazy" alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>{mode === "day" && <Button variant="light" size="icon" className="absolute right-3 top-3" aria-label={`${t.favourite} ${story.title}`} onClick={() => toggleFavorite(story.slug)}><Heart size={18} fill={favorites.includes(story.slug) ? "currentColor" : "none"}/></Button>}<Button size="icon" className="absolute bottom-3 right-3" aria-label={`${t.play} ${story.title}`} onClick={() => play(story)}><Play size={18} fill="currentColor"/></Button></div><div className="p-5"><div className="flex items-center gap-2 text-xs font-semibold uppercase text-primary"><span>{story.category}</span><span>•</span><span>{story.duration}</span></div><h3 className="mt-2 text-xl font-bold"><Link to="/stories/$slug" params={{ slug: story.slug }} className="hover:text-primary">{story.title}</Link></h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{story.description}</p><p className="mt-3 rounded-md bg-secondary px-3 py-2 text-xs font-semibold text-secondary-foreground">⭐ {story.moral}</p><div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground"><span>{story.ageGroup}</span><span>{story.language}</span><span>{story.narrator}</span></div></div></article>)}
        </div>
        {filtered.length === 0 && <p className="rounded-lg bg-popover p-10 text-center text-muted-foreground">{t.noStories}</p>}
      </section>

      <ModesSection/>

      {mode === "day" ? <MoralQuest/> : <p className="mx-auto max-w-3xl px-5 py-10 text-center text-muted-foreground"><Moon className="mx-auto mb-3 text-primary" size={28}/>{t.nightNote}</p>}

      <VoiceSection/>

      <section id="categories" className="bg-popover py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="text-sm font-semibold uppercase text-primary">{t.catEyebrow}</p><div className="mt-2 flex items-end justify-between gap-6"><h2 className="text-3xl font-bold md:text-5xl">{t.catTitle}</h2><span className="hidden text-sm text-muted-foreground md:block">{t.catCount}</span></div><div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">{categories.map(([name, , icon], index) => <Button variant="ghost" key={name} onClick={() => { setQuery(name); document.getElementById("stories")?.scrollIntoView(); }} className="flex min-h-40 h-auto flex-col items-start justify-start gap-0 whitespace-normal rounded-lg border border-border bg-background p-5 text-left transition hover:-translate-y-1 hover:border-primary"><span className="text-3xl" aria-hidden>{icon}</span><strong className="mt-6 block text-sm">{name}</strong><span className="mt-1 block text-xs font-normal leading-5 text-muted-foreground">{t.categories[index]}</span></Button>)}</div></div></section>

      <section id="journey" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="text-center"><p className="text-sm font-semibold uppercase text-primary">{t.journeyEyebrow}</p><h2 className="mt-2 text-3xl font-bold md:text-5xl">{t.journeyTitle}</h2></div><div className="relative mt-14 grid gap-8 md:grid-cols-3"><div className="hidden md:absolute md:left-[17%] md:right-[17%] md:top-7 md:block md:border-t md:border-dashed md:border-primary/40"/>{[["01",t.step1,t.step1Text],["02",t.step2,t.step2Text],["03",t.step3,t.step3Text]].map(([n,title,text]) => <div className="relative text-center" key={n}><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{n}</span><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div><div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">{[[appHomeDesktop,t.shot1,t.shot1Text],[appStoryDetail,t.shot2,t.shot2Text],[appHomeMobile,t.shot3,t.shot3Text]].map(([img, title, text]) => <figure key={title} className="group rounded-lg border border-border bg-popover p-4 shadow-soft transition duration-300 hover:-translate-y-1.5"><img src={img} alt={`${title} — ${t.screenshot}`} loading="lazy" className="w-full rounded-md shadow-soft"/><figcaption className="px-2 pb-2 pt-4"><strong className="block text-sm font-bold">{title}</strong><span className="mt-1 block text-sm leading-6 text-muted-foreground">{text}</span></figcaption></figure>)}</div></section>

      <section className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8"><div><p className="text-sm font-semibold uppercase text-secondary">{t.regionEyebrow}</p><h2 className="mt-3 text-4xl font-bold md:text-6xl">{t.regionTitle1}<br/>{t.regionTitle2}</h2><p className="mt-6 max-w-lg leading-8 text-primary-foreground/80">{t.regionText}</p><Button variant="light" className="mt-8">{t.regionCta}</Button></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{["मराठी · Maharashtra","தமிழ் · Tamil Nadu","বাংলা · Bengal","ಕನ್ನಡ · Karnataka","മലയാളം · Kerala","हिंदी · North India"].map((place, i) => <div key={place} className={`flex min-h-32 items-end rounded-lg border border-primary-foreground/20 p-4 ${i === 1 || i === 4 ? "bg-secondary text-secondary-foreground" : "bg-primary-foreground/10"}`}><span className="text-sm font-semibold">{place}</span></div>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="grid gap-12 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase text-primary">{t.whyEyebrow}</p><h2 className="mt-2 text-3xl font-bold md:text-5xl">{t.whyTitle1}<br/>{t.whyTitle2}</h2><div className="mt-9 grid gap-5">{[["01",t.why1,t.why1Text],["02",t.why2,t.why2Text],["03",t.why3,t.why3Text]].map(([n,t,d]) => <div className="grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-5" key={n}><span className="text-sm font-bold text-primary">{n}</span><div><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{d}</p></div></div>)}</div></div><div className="motif-border flex min-h-96 items-center justify-center rounded-lg border border-border p-8"><div className="max-w-sm rounded-lg bg-popover p-7 shadow-soft"><Volume2 className="text-primary" size={30}/><p className="mt-8 text-2xl font-bold">{t.quote}</p><p className="mt-5 text-sm text-muted-foreground">{t.quoteBy}</p></div></div></div></section>

      <section id="parents" className="bg-secondary py-20 text-secondary-foreground"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-12 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase text-primary">{t.parentsEyebrow}</p><h2 className="mt-2 text-3xl font-bold md:text-5xl">{t.parentsTitle}</h2><p className="mt-5 max-w-xl leading-7">{t.parentsText}</p><Button className="mt-7">{t.parentsCta}</Button></div><figure className="rounded-lg bg-popover p-8 text-foreground"><span className="text-xs font-bold uppercase text-primary">{t.testimonialLabel}</span><blockquote className="mt-5 text-xl font-medium leading-8">{t.testimonial}</blockquote><figcaption className="mt-6 text-sm text-muted-foreground">{t.testimonialBy}</figcaption></figure></div></div></section>

      <section className="mx-auto max-w-4xl px-5 py-24"><div className="text-center"><p className="text-sm font-semibold uppercase text-primary">{t.faqEyebrow}</p><h2 className="mt-2 text-3xl font-bold md:text-5xl">{t.faqTitle}</h2></div><div className="mt-10 divide-y divide-border border-y border-border">{[[t.q1,t.a1],[t.q2,t.a2],[t.q3,t.a3],[t.q4,t.a4]].map(([q,a]) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{q}<ChevronDown className="shrink-0 transition group-open:rotate-180" size={20}/></summary><p className="max-w-2xl pt-3 text-sm leading-6 text-muted-foreground">{a}</p></details>)}</div></section>

      <section className="mx-5 mb-20 rounded-lg bg-ink px-6 py-14 text-center text-ink-foreground lg:mx-auto lg:max-w-7xl"><p className="text-sm font-semibold uppercase text-secondary">{t.newsEyebrow}</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">{t.newsTitle}</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-ink-foreground/70">{t.newsText}</p><form className="mx-auto mt-7 grid max-w-lg gap-2 sm:grid-cols-[1fr_auto]" onSubmit={(e) => e.preventDefault()}><label><span className="sr-only">{t.email}</span><input type="email" required placeholder={t.email} className="h-12 w-full rounded-full border border-ink-foreground/20 bg-ink-foreground/10 px-5 outline-none placeholder:text-ink-foreground/55 focus:ring-2 focus:ring-secondary"/></label><Button variant="light" type="submit">{t.join}</Button></form></section>
    </main>

    <footer className="border-t border-border bg-popover"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)] lg:px-8"><div><Logo/><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">{t.footerText}</p></div>{[[t.fDiscover,t.navStories,t.navCategories,t.fLanguages],["Katha Kutira",t.fAbout,t.fStorytellers,t.fContact],[t.fFamilies,t.fParents,t.fPrivacy,t.fTerms]].map(([heading,...links]) => <div key={heading}><h3 className="text-sm font-bold">{heading}</h3><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{links.map((link) => <li key={link}><a href="#stories" className="hover:text-primary">{link}</a></li>)}</ul></div>)}</div><div className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">{t.copyright}</div></footer>

    {activeStory && <div className="fixed inset-x-3 bottom-3 z-50 mx-auto grid max-w-3xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-primary-foreground/15 bg-primary p-3 text-primary-foreground shadow-2xl"><img src={activeStory.artwork} alt="" className="h-12 w-12 shrink-0 rounded-md object-cover"/><div className="min-w-0"><p className="truncate text-sm font-semibold">{activeStory.title}</p><p className="truncate text-xs text-primary-foreground/70">{t.narrating} · {activeStory.language}</p><div className="mt-2 h-1 overflow-hidden rounded-full bg-primary-foreground/20"><div className={`h-full w-1/3 bg-secondary ${isPaused ? "opacity-40" : "animate-pulse"}`}/></div></div><div className="flex items-center gap-1"><Button variant="light" size="icon" aria-label={isPaused ? t.resume : t.pause} onClick={togglePause}>{isPaused ? <Play size={18} fill="currentColor"/> : <Pause size={18} fill="currentColor"/>}</Button><Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10" aria-label={t.closePlayer} onClick={stop}><X size={18}/></Button></div></div>}
  </div>;
}
