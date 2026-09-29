import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Pause, Play, Search, Sparkles, Volume2, X } from "lucide-react";
import { useMemo, useState } from "react";
import heroImage from "@/assets/katha-hero.jpg";
import appHomeDesktop from "@/assets/app-home-desktop.jpg";
import appHomeMobile from "@/assets/app-home-mobile.jpg";
import appStoryDetail from "@/assets/app-story-detail.jpg";
import { Button } from "@/components/Button";
import { categories, stories, type Story } from "@/lib/stories";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Katha Kutira — Every Story Has a Home" },
    { name: "description", content: "Listen to Indian folktales, Panchatantra, regional tales and gentle bedtime stories made for curious young minds." },
    { property: "og:title", content: "Katha Kutira — Every Story Has a Home" },
    { property: "og:description", content: "A warm, audio-first home for India’s stories, made for children." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Logo() {
  return <Link to="/" className="flex items-center gap-2 font-bold text-foreground"><span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-lg text-primary-foreground">क</span><span>Katha Kutira</span></Link>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All languages");
  const [age, setAge] = useState("All ages");
  const [playing, setPlaying] = useState<Story | null>(null);
  const [paused, setPaused] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const filtered = useMemo(() => stories.filter((story) =>
    (!query || `${story.title} ${story.category} ${story.themes.join(" ")}`.toLowerCase().includes(query.toLowerCase())) &&
    (language === "All languages" || story.language === language) &&
    (age === "All ages" || story.ageGroup.startsWith(age))), [age, language, query]);

  const play = (story: Story) => { setPlaying(story); setPaused(false); };
  const toggleFavorite = (slug: string) => setFavorites((items) => items.includes(slug) ? items.filter((item) => item !== slug) : [...items, slug]);

  return <div className="min-h-screen overflow-x-hidden bg-background pb-24 text-foreground">
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 lg:flex lg:justify-between lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex" aria-label="Main navigation">
          <a href="#stories" className="hover:text-primary">Stories</a><a href="#categories" className="hover:text-primary">Categories</a><a href="#journey" className="hover:text-primary">How it works</a><a href="#parents" className="hover:text-primary">For parents</a>
        </nav>
        <div className="hidden items-center gap-2 lg:flex"><Button variant="ghost" size="icon" aria-label="Search stories" onClick={() => document.getElementById("story-search")?.focus()}><Search size={19}/></Button><Button size="sm" onClick={() => { const firstStory = stories[0]; if (firstStory) play(firstStory); }}><Play size={16} fill="currentColor"/>Listen now</Button></div>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</Button>
      </div>
      {menuOpen && <nav className="grid gap-1 border-t border-border bg-background p-4 lg:hidden"><a href="#stories" className="rounded-md px-3 py-3" onClick={() => setMenuOpen(false)}>Stories</a><a href="#categories" className="rounded-md px-3 py-3" onClick={() => setMenuOpen(false)}>Categories</a><a href="#journey" className="rounded-md px-3 py-3" onClick={() => setMenuOpen(false)}>How it works</a><a href="#parents" className="rounded-md px-3 py-3" onClick={() => setMenuOpen(false)}>For parents</a></nav>}
    </header>

    <main>
      <section className="relative min-h-[640px] overflow-hidden bg-foreground md:min-h-[720px]">
        <img src={heroImage} width={1536} height={1024} alt="A glowing story cottage beneath a banyan tree, with children and forest friends gathered nearby" className="absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-85" fetchPriority="high"/>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/55 to-transparent"/>
        <div className="relative mx-auto flex min-h-[640px] max-w-7xl items-center px-5 py-20 md:min-h-[720px] lg:px-8">
          <div className="max-w-2xl text-primary-foreground">
            <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]"><Sparkles size={17}/> Stories from every corner of India</p>
            <h1 className="max-w-xl text-5xl font-bold leading-[1.08] md:text-7xl">Every Story<br/>Has a Home.</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-primary-foreground/90 md:text-lg">Katha Kutira brings the stories, wisdom and imagination of India to life through a magical, audio-first experience for children.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild variant="light"><a href="#stories">Explore stories</a></Button><Button variant="secondary" onClick={() => { const firstStory = stories[0]; if (firstStory) play(firstStory); }}><Play size={17} fill="currentColor"/>Listen to a story</Button></div>
          </div>
        </div>
      </section>

      <section id="stories" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-sm font-semibold uppercase text-primary">Open the story door</p><h2 className="mt-2 text-3xl font-bold md:text-5xl">Find a tale for right now.</h2></div><p className="max-w-md text-muted-foreground">A quiet bedtime, a curious afternoon, or a long journey—there is always a story waiting.</p></div>
        <div className="mb-10 grid gap-3 rounded-lg border border-border bg-popover p-4 shadow-soft md:grid-cols-[minmax(0,1.7fr)_repeat(2,minmax(150px,0.65fr))]">
          <label className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18}/><span className="sr-only">Search stories</span><input id="story-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search stories, characters or moods" className="h-12 w-full rounded-md border border-border bg-background pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"/></label>
          <label><span className="sr-only">Filter by language</span><select value={language} onChange={(e) => setLanguage(e.target.value)} className="h-12 w-full rounded-md border border-border bg-background px-4 text-sm"><option>All languages</option><option>English</option><option>Hindi</option></select></label>
          <label><span className="sr-only">Filter by age</span><select value={age} onChange={(e) => setAge(e.target.value)} className="h-12 w-full rounded-md border border-border bg-background px-4 text-sm"><option>All ages</option><option>5</option><option>6</option><option>7</option></select></label>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((story) => <article key={story.slug} className="group overflow-hidden rounded-lg bg-popover shadow-soft"><div className="relative aspect-[4/3] overflow-hidden"><img src={story.artwork} width={768} height={1024} loading="lazy" alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><Button variant="light" size="icon" className="absolute right-3 top-3" aria-label={`Favourite ${story.title}`} onClick={() => toggleFavorite(story.slug)}><Heart size={18} fill={favorites.includes(story.slug) ? "currentColor" : "none"}/></Button><Button size="icon" className="absolute bottom-3 right-3" aria-label={`Play ${story.title}`} onClick={() => play(story)}><Play size={18} fill="currentColor"/></Button></div><div className="p-5"><div className="flex items-center gap-2 text-xs font-semibold uppercase text-primary"><span>{story.category}</span><span>•</span><span>{story.duration}</span></div><h3 className="mt-2 text-xl font-bold"><Link to="/stories/$slug" params={{ slug: story.slug }} className="hover:text-primary">{story.title}</Link></h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{story.description}</p><div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground"><span>{story.ageGroup}</span><span>{story.language}</span><span>{story.narrator}</span></div></div></article>)}
        </div>
        {filtered.length === 0 && <p className="rounded-lg bg-popover p-10 text-center text-muted-foreground">No stories found yet. Try a different search.</p>}
      </section>

      <section id="categories" className="bg-popover py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="text-sm font-semibold uppercase text-primary">Browse the shelves</p><div className="mt-2 flex items-end justify-between gap-6"><h2 className="text-3xl font-bold md:text-5xl">A world of stories</h2><span className="hidden text-sm text-muted-foreground md:block">10 collections · more arriving soon</span></div><div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">{categories.map(([name, description, icon]) => <button key={name} onClick={() => { setQuery(name); document.getElementById("stories")?.scrollIntoView(); }} className="min-h-40 rounded-lg border border-border bg-background p-5 text-left transition hover:-translate-y-1 hover:border-primary"><span className="text-3xl" aria-hidden>{icon}</span><strong className="mt-6 block text-sm">{name}</strong><span className="mt-1 block text-xs leading-5 text-muted-foreground">{description}</span></button>)}</div></div></section>

      <section id="journey" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="text-center"><p className="text-sm font-semibold uppercase text-primary">As simple as once upon a time</p><h2 className="mt-2 text-3xl font-bold md:text-5xl">Choose. Press play. Imagine.</h2></div><div className="relative mt-14 grid gap-8 md:grid-cols-3"><div className="hidden md:absolute md:left-[17%] md:right-[17%] md:top-7 md:block md:border-t md:border-dashed md:border-primary/40"/>{[["01","Choose a story","Follow a mood, a language or a character that sparks curiosity."],["02","Press play","Settle in with thoughtful narration and a calm, screen-light experience."],["03","Imagine","Let every voice, forest and faraway place unfold in the mind."]].map(([n,title,text]) => <div className="relative text-center" key={n}><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{n}</span><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div></section>

      <section className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8"><div><p className="text-sm font-semibold uppercase text-secondary">One country. Thousands of stories.</p><h2 className="mt-3 text-4xl font-bold md:text-6xl">Many languages.<br/>One listening home.</h2><p className="mt-6 max-w-lg leading-8 text-primary-foreground/80">From Kashmir’s mountain tales to Kerala’s moonlit legends, children can discover India through voices rooted in place, memory and imagination.</p><Button variant="light" className="mt-8">Explore regional stories</Button></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{["मराठी · Maharashtra","தமிழ் · Tamil Nadu","বাংলা · Bengal","ಕನ್ನಡ · Karnataka","മലയാളം · Kerala","हिंदी · North India"].map((place, i) => <div key={place} className={`flex min-h-32 items-end rounded-lg border border-primary-foreground/20 p-4 ${i === 1 || i === 4 ? "bg-secondary text-secondary-foreground" : "bg-primary-foreground/10"}`}><span className="text-sm font-semibold">{place}</span></div>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="grid gap-12 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase text-primary">Why Katha Kutira</p><h2 className="mt-2 text-3xl font-bold md:text-5xl">More listening.<br/>Less screen time.</h2><div className="mt-9 grid gap-5">{[["01","Made for the mind’s eye","Audio leaves room for children to picture every character and place."],["02","Rooted in many Indias","Regional voices and traditions make culture feel alive, not like a lesson."],["03","A calm corner for families","Thoughtful pacing and age guidance help parents choose with confidence."]].map(([n,t,d]) => <div className="grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-5" key={n}><span className="text-sm font-bold text-primary">{n}</span><div><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{d}</p></div></div>)}</div></div><div className="motif-border flex min-h-96 items-center justify-center rounded-lg border border-border p-8"><div className="max-w-sm rounded-lg bg-popover p-7 shadow-soft"><Volume2 className="text-primary" size={30}/><p className="mt-8 text-2xl font-bold">“A good story doesn’t fill the screen. It fills the imagination.”</p><p className="mt-5 text-sm text-muted-foreground">The Katha Kutira listening promise</p></div></div></div></section>

      <section id="parents" className="bg-secondary py-20 text-secondary-foreground"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-12 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase text-primary">For parents & storytellers</p><h2 className="mt-2 text-3xl font-bold md:text-5xl">Voices children remember.</h2><p className="mt-5 max-w-xl leading-7">Discover carefully narrated stories with clear age, language and duration guidance—made for bedtime, car rides and slow afternoons together.</p><Button className="mt-7">Meet our storytellers</Button></div><figure className="rounded-lg bg-popover p-8 text-foreground"><span className="text-xs font-bold uppercase text-primary">Parent testimonial · placeholder</span><blockquote className="mt-5 text-xl font-medium leading-8">“Our daughter asks for one more story instead of one more video. The whole room slows down.”</blockquote><figcaption className="mt-6 text-sm text-muted-foreground">Parent name · Bengaluru</figcaption></figure></div></div></section>

      <section className="mx-auto max-w-4xl px-5 py-24"><div className="text-center"><p className="text-sm font-semibold uppercase text-primary">A few good questions</p><h2 className="mt-2 text-3xl font-bold md:text-5xl">Parents often ask</h2></div><div className="mt-10 divide-y divide-border border-y border-border">{[["What age is Katha Kutira for?","Our current stories are designed for children aged 4–12, with a clear age guide on every tale."],["Which languages can we listen in?","We are beginning with English and Hindi, with more Indian languages joining the library."],["Is this a screen-free experience?","The experience is audio-first. After choosing a story, children can simply listen and imagine."],["Can I save stories for later?","Yes. Tap the heart on any story to add it to your favourites for this session."]].map(([q,a]) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{q}<ChevronDown className="shrink-0 transition group-open:rotate-180" size={20}/></summary><p className="max-w-2xl pt-3 text-sm leading-6 text-muted-foreground">{a}</p></details>)}</div></section>

      <section className="mx-5 mb-20 rounded-lg bg-foreground px-6 py-14 text-center text-primary-foreground lg:mx-auto lg:max-w-7xl"><p className="text-sm font-semibold uppercase text-secondary">A fresh tale in your inbox</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">Keep a little storylight on.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-primary-foreground/70">Occasional new stories, listening ideas and gentle notes for growing imaginations.</p><form className="mx-auto mt-7 grid max-w-lg gap-2 sm:grid-cols-[1fr_auto]" onSubmit={(e) => e.preventDefault()}><label><span className="sr-only">Email address</span><input type="email" required placeholder="Your email address" className="h-12 w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 outline-none placeholder:text-primary-foreground/55 focus:ring-2 focus:ring-secondary"/></label><Button variant="light" type="submit">Join the circle</Button></form></section>
    </main>

    <footer className="border-t border-border bg-popover"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)] lg:px-8"><div><Logo/><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">A home for Indian stories, built for children and designed around the magic of listening.</p></div>{[["Discover","Stories","Categories","Languages"],["Katha Kutira","About","Storytellers","Contact"],["For families","Parents","Privacy","Terms"]].map(([heading,...links]) => <div key={heading}><h3 className="text-sm font-bold">{heading}</h3><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{links.map((link) => <li key={link}><a href="#stories" className="hover:text-primary">{link}</a></li>)}</ul></div>)}</div><div className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">© 2026 Katha Kutira. Made with wonder in India.</div></footer>

    {playing && <div className="fixed inset-x-3 bottom-3 z-50 mx-auto grid max-w-3xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-primary-foreground/15 bg-primary p-3 text-primary-foreground shadow-2xl"><img src={playing.artwork} alt="" className="h-12 w-12 shrink-0 rounded-md object-cover"/><div className="min-w-0"><p className="truncate text-sm font-semibold">{playing.title}</p><p className="truncate text-xs text-primary-foreground/70">{playing.narrator} · {playing.duration}</p><div className="mt-2 h-1 overflow-hidden rounded-full bg-primary-foreground/20"><div className="h-full w-1/3 bg-secondary"/></div></div><div className="flex items-center gap-1"><Button variant="light" size="icon" aria-label={paused ? "Resume story" : "Pause story"} onClick={() => setPaused(!paused)}>{paused ? <Play size={18} fill="currentColor"/> : <Pause size={18} fill="currentColor"/>}</Button><Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10" aria-label="Close player" onClick={() => setPlaying(null)}><X size={18}/></Button></div></div>}
  </div>;
}
