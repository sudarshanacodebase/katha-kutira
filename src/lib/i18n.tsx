import { positioning } from "@/lib/i18n-positioning";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "kn" | "hi";
export const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "hi", label: "हिंदी" },
];

const en = {
  navStories: "Stories", navCategories: "Categories", navJourney: "How it works", navParents: "For parents",
  searchStories: "Search stories", listenNow: "Listen now", toggleNav: "Toggle navigation", chooseLanguage: "Choose language",
  heroEyebrow: "Stories from every corner of India", heroTitle1: "Every Story", heroTitle2: "Has a Home.",
  heroText: "Katha Kutira brings the stories, wisdom and imagination of India to life through a magical, audio-first experience for children.",
  exploreStories: "Explore stories", listenStory: "Listen to a story", getApp: "Get the app", getItOn: "Get it on", downloadOn: "Download on the",
  storiesEyebrow: "Open the story door", storiesTitle: "Find a tale for right now.",
  storiesText: "A quiet bedtime, a curious afternoon, or a long journey—there is always a story waiting.",
  searchPlaceholder: "Search stories, characters or moods", filterLanguage: "Filter by language", filterAge: "Filter by age",
  allLanguages: "All languages", allAges: "All ages", english: "English", hindi: "Hindi", ageFrom: "From age",
  favourite: "Favourite", play: "Play", noStories: "No stories found yet. Try a different search.",
  catEyebrow: "Browse the shelves", catTitle: "A world of stories", catCount: "10 collections · more arriving soon",
  journeyEyebrow: "As simple as once upon a time", journeyTitle: "Choose. Press play. Imagine.",
  step1: "Choose a story", step1Text: "Follow a mood, a language or a character that sparks curiosity.",
  step2: "Press play", step2Text: "Settle in with thoughtful narration and a calm, screen-light experience.",
  step3: "Imagine", step3Text: "Let every voice, forest and faraway place unfold in the mind.",
  shot1: "The home shelf", shot1Text: "Browse stories, filter by language and age, and start listening in one tap.",
  shot2: "Inside a story", shot2Text: "Cover art, narrator and playback controls for every tale.",
  shot3: "Take it anywhere", shot3Text: "The whole listening corner fits a small screen, ready for car rides and bedtime.",
  screenshot: "Katha Kutira app screenshot",
  regionEyebrow: "One country. Thousands of stories.", regionTitle1: "Many languages.", regionTitle2: "One listening home.",
  regionText: "From Kashmir’s mountain tales to Kerala’s moonlit legends, children can discover India through voices rooted in place, memory and imagination.",
  regionCta: "Explore regional stories",
  whyEyebrow: "Why Katha Kutira", whyTitle1: "More listening.", whyTitle2: "Less screen time.",
  why1: "Made for the mind’s eye", why1Text: "Audio leaves room for children to picture every character and place.",
  why2: "Rooted in many Indias", why2Text: "Regional voices and traditions make culture feel alive, not like a lesson.",
  why3: "A calm corner for families", why3Text: "Thoughtful pacing and age guidance help parents choose with confidence.",
  quote: "“A good story doesn’t fill the screen. It fills the imagination.”", quoteBy: "The Katha Kutira listening promise",
  parentsEyebrow: "For parents & storytellers", parentsTitle: "Voices children remember.",
  parentsText: "Discover carefully narrated stories with clear age, language and duration guidance—made for bedtime, car rides and slow afternoons together.",
  parentsCta: "Meet our storytellers", testimonialLabel: "Parent testimonial · placeholder",
  testimonial: "“Our daughter asks for one more story instead of one more video. The whole room slows down.”", testimonialBy: "Parent name · Bengaluru",
  faqEyebrow: "A few good questions", faqTitle: "Parents often ask",
  q1: "What age is Katha Kutira for?", a1: "Our current stories are designed for children aged 4–12, with a clear age guide on every tale.",
  q2: "Which languages can we listen in?", a2: "We are beginning with English and Hindi, with more Indian languages joining the library.",
  q3: "Is this a screen-free experience?", a3: "The experience is audio-first. After choosing a story, children can simply listen and imagine.",
  q4: "Can I save stories for later?", a4: "Yes. Tap the heart on any story to add it to your favourites for this session.",
  newsEyebrow: "A fresh tale in your inbox", newsTitle: "Keep a little storylight on.",
  newsText: "Occasional new stories, listening ideas and gentle notes for growing imaginations.",
  email: "Your email address", join: "Join the circle",
  footerText: "A home for Indian stories, built for children and designed around the magic of listening.",
  fDiscover: "Discover", fLanguages: "Languages", fAbout: "About", fStorytellers: "Storytellers", fContact: "Contact",
  fFamilies: "For families", fParents: "Parents", fPrivacy: "Privacy", fTerms: "Terms",
  copyright: "© 2026 Katha Kutira. Made with wonder in India.",
  narrating: "Narrating now", pause: "Pause story", resume: "Resume story", closePlayer: "Close player",
  back: "Back to stories", coverFor: "Cover art for", narratedBy: "Narrated by", playStory: "Play story", stop: "Stop",
  favStory: "Favourite story", characters: "Meet the characters", readAlong: "Read along", more: "More stories for you",
  categories: ["Timeless animal wisdom", "Tales passed down", "Wonder-filled legends", "Wit in the royal court", "Clever southern tales", "Stories of compassion", "Every corner, a voice", "Gentle tales for night", "Joy, light and tradition", "Wild and wonderful"],
};
type Dict = typeof en;

const kn: Dict = {
  navStories: "ಕಥೆಗಳು", navCategories: "ವರ್ಗಗಳು", navJourney: "ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", navParents: "ಪೋಷಕರಿಗೆ",
  searchStories: "ಕಥೆಗಳನ್ನು ಹುಡುಕಿ", listenNow: "ಈಗ ಕೇಳಿ", toggleNav: "ಮೆನು ತೆರೆಯಿರಿ", chooseLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
  heroEyebrow: "ಭಾರತದ ಮೂಲೆ ಮೂಲೆಯ ಕಥೆಗಳು", heroTitle1: "ಪ್ರತಿ ಕಥೆಗೂ", heroTitle2: "ಒಂದು ಮನೆ.",
  heroText: "ಕಥಾ ಕುಟೀರ ಭಾರತದ ಕಥೆಗಳು, ಜ್ಞಾನ ಮತ್ತು ಕಲ್ಪನೆಯನ್ನು ಮಕ್ಕಳಿಗಾಗಿ ಮಾಂತ್ರಿಕ, ಧ್ವನಿ-ಪ್ರಧಾನ ಅನುಭವದ ಮೂಲಕ ಜೀವಂತಗೊಳಿಸುತ್ತದೆ.",
  exploreStories: "ಕಥೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ", listenStory: "ಒಂದು ಕಥೆ ಕೇಳಿ", getApp: "ಆ್ಯಪ್ ಪಡೆಯಿರಿ", getItOn: "ಇಲ್ಲಿ ಪಡೆಯಿರಿ", downloadOn: "ಇಲ್ಲಿಂದ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
  storiesEyebrow: "ಕಥೆಯ ಬಾಗಿಲು ತೆರೆಯಿರಿ", storiesTitle: "ಈ ಕ್ಷಣಕ್ಕೊಂದು ಕಥೆ ಹುಡುಕಿ.",
  storiesText: "ಶಾಂತ ಮಲಗುವ ಸಮಯ, ಕುತೂಹಲದ ಮಧ್ಯಾಹ್ನ ಅಥವಾ ದೀರ್ಘ ಪ್ರಯಾಣ—ಯಾವಾಗಲೂ ಒಂದು ಕಥೆ ಕಾಯುತ್ತಿರುತ್ತದೆ.",
  searchPlaceholder: "ಕಥೆಗಳು, ಪಾತ್ರಗಳು ಅಥವಾ ಭಾವಗಳನ್ನು ಹುಡುಕಿ", filterLanguage: "ಭಾಷೆಯ ಪ್ರಕಾರ ಆರಿಸಿ", filterAge: "ವಯಸ್ಸಿನ ಪ್ರಕಾರ ಆರಿಸಿ",
  allLanguages: "ಎಲ್ಲಾ ಭಾಷೆಗಳು", allAges: "ಎಲ್ಲಾ ವಯಸ್ಸು", english: "ಇಂಗ್ಲಿಷ್", hindi: "ಹಿಂದಿ", ageFrom: "ವಯಸ್ಸು",
  favourite: "ಮೆಚ್ಚಿನದು", play: "ಪ್ಲೇ ಮಾಡಿ", noStories: "ಯಾವುದೇ ಕಥೆ ಸಿಗಲಿಲ್ಲ. ಬೇರೆ ಹುಡುಕಾಟ ಪ್ರಯತ್ನಿಸಿ.",
  catEyebrow: "ಕಪಾಟುಗಳನ್ನು ನೋಡಿ", catTitle: "ಕಥೆಗಳ ಲೋಕ", catCount: "10 ಸಂಗ್ರಹಗಳು · ಇನ್ನಷ್ಟು ಬರಲಿವೆ",
  journeyEyebrow: "ಒಂದಾನೊಂದು ಕಾಲದಷ್ಟೇ ಸರಳ", journeyTitle: "ಆರಿಸಿ. ಪ್ಲೇ ಒತ್ತಿ. ಕಲ್ಪಿಸಿ.",
  step1: "ಕಥೆ ಆರಿಸಿ", step1Text: "ಕುತೂಹಲ ಹುಟ್ಟಿಸುವ ಭಾವ, ಭಾಷೆ ಅಥವಾ ಪಾತ್ರವನ್ನು ಅನುಸರಿಸಿ.",
  step2: "ಪ್ಲೇ ಒತ್ತಿ", step2Text: "ಆಪ್ತ ನಿರೂಪಣೆ ಮತ್ತು ಶಾಂತ, ಕಡಿಮೆ-ಪರದೆಯ ಅನುಭವದಲ್ಲಿ ನೆಲೆಸಿ.",
  step3: "ಕಲ್ಪಿಸಿ", step3Text: "ಪ್ರತಿ ಧ್ವನಿ, ಕಾಡು ಮತ್ತು ದೂರದ ಸ್ಥಳ ಮನಸ್ಸಿನಲ್ಲಿ ಅರಳಲಿ.",
  shot1: "ಮುಖಪುಟದ ಕಪಾಟು", shot1Text: "ಕಥೆಗಳನ್ನು ನೋಡಿ, ಭಾಷೆ ಮತ್ತು ವಯಸ್ಸಿನ ಪ್ರಕಾರ ಆರಿಸಿ, ಒಂದೇ ಸ್ಪರ್ಶದಲ್ಲಿ ಕೇಳಲು ಆರಂಭಿಸಿ.",
  shot2: "ಕಥೆಯ ಒಳಗೆ", shot2Text: "ಪ್ರತಿ ಕಥೆಗೆ ಮುಖಚಿತ್ರ, ನಿರೂಪಕ ಮತ್ತು ಪ್ಲೇಬ್ಯಾಕ್ ನಿಯಂತ್ರಣಗಳು.",
  shot3: "ಎಲ್ಲಿಗೂ ಕೊಂಡೊಯ್ಯಿರಿ", shot3Text: "ಇಡೀ ಕೇಳುವ ಮೂಲೆ ಚಿಕ್ಕ ಪರದೆಗೆ ಹೊಂದುತ್ತದೆ, ಕಾರು ಪ್ರಯಾಣ ಮತ್ತು ಮಲಗುವ ಸಮಯಕ್ಕೆ ಸಿದ್ಧ.",
  screenshot: "ಕಥಾ ಕುಟೀರ ಆ್ಯಪ್ ಸ್ಕ್ರೀನ್‌ಶಾಟ್",
  regionEyebrow: "ಒಂದು ದೇಶ. ಸಾವಿರಾರು ಕಥೆಗಳು.", regionTitle1: "ಹಲವು ಭಾಷೆಗಳು.", regionTitle2: "ಒಂದು ಕೇಳುವ ಮನೆ.",
  regionText: "ಕಾಶ್ಮೀರದ ಪರ್ವತ ಕಥೆಗಳಿಂದ ಕೇರಳದ ಬೆಳದಿಂಗಳ ದಂತಕಥೆಗಳವರೆಗೆ, ಮಕ್ಕಳು ನೆಲ, ನೆನಪು ಮತ್ತು ಕಲ್ಪನೆಯಲ್ಲಿ ಬೇರೂರಿದ ಧ್ವನಿಗಳ ಮೂಲಕ ಭಾರತವನ್ನು ಅರಿಯಬಹುದು.",
  regionCta: "ಪ್ರಾದೇಶಿಕ ಕಥೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
  whyEyebrow: "ಏಕೆ ಕಥಾ ಕುಟೀರ", whyTitle1: "ಹೆಚ್ಚು ಕೇಳುವಿಕೆ.", whyTitle2: "ಕಡಿಮೆ ಪರದೆ ಸಮಯ.",
  why1: "ಮನಸ್ಸಿನ ಕಣ್ಣಿಗಾಗಿ", why1Text: "ಧ್ವನಿ ಮಕ್ಕಳಿಗೆ ಪ್ರತಿ ಪಾತ್ರ ಮತ್ತು ಸ್ಥಳವನ್ನು ಕಲ್ಪಿಸಲು ಅವಕಾಶ ನೀಡುತ್ತದೆ.",
  why2: "ಹಲವು ಭಾರತಗಳಲ್ಲಿ ಬೇರೂರಿದೆ", why2Text: "ಪ್ರಾದೇಶಿಕ ಧ್ವನಿಗಳು ಮತ್ತು ಪರಂಪರೆಗಳು ಸಂಸ್ಕೃತಿಯನ್ನು ಪಾಠವಾಗಿ ಅಲ್ಲ, ಜೀವಂತವಾಗಿ ತೋರಿಸುತ್ತವೆ.",
  why3: "ಕುಟುಂಬಗಳಿಗೆ ಶಾಂತ ಮೂಲೆ", why3Text: "ಆಲೋಚಿತ ವೇಗ ಮತ್ತು ವಯಸ್ಸಿನ ಮಾರ್ಗದರ್ಶನ ಪೋಷಕರಿಗೆ ವಿಶ್ವಾಸದಿಂದ ಆರಿಸಲು ನೆರವಾಗುತ್ತದೆ.",
  quote: "“ಒಳ್ಳೆಯ ಕಥೆ ಪರದೆಯನ್ನು ತುಂಬುವುದಿಲ್ಲ. ಅದು ಕಲ್ಪನೆಯನ್ನು ತುಂಬುತ್ತದೆ.”", quoteBy: "ಕಥಾ ಕುಟೀರದ ಕೇಳುವ ವಾಗ್ದಾನ",
  parentsEyebrow: "ಪೋಷಕರು ಮತ್ತು ಕಥೆಗಾರರಿಗೆ", parentsTitle: "ಮಕ್ಕಳು ನೆನಪಿಡುವ ಧ್ವನಿಗಳು.",
  parentsText: "ಸ್ಪಷ್ಟ ವಯಸ್ಸು, ಭಾಷೆ ಮತ್ತು ಅವಧಿಯ ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ಜಾಗರೂಕತೆಯಿಂದ ನಿರೂಪಿಸಿದ ಕಥೆಗಳು—ಮಲಗುವ ಸಮಯ, ಕಾರು ಪ್ರಯಾಣ ಮತ್ತು ನಿಧಾನ ಮಧ್ಯಾಹ್ನಗಳಿಗಾಗಿ.",
  parentsCta: "ನಮ್ಮ ಕಥೆಗಾರರನ್ನು ಭೇಟಿಯಾಗಿ", testimonialLabel: "ಪೋಷಕರ ಅಭಿಪ್ರಾಯ · ಮಾದರಿ",
  testimonial: "“ನಮ್ಮ ಮಗಳು ಇನ್ನೊಂದು ವೀಡಿಯೊ ಬದಲು ಇನ್ನೊಂದು ಕಥೆ ಕೇಳುತ್ತಾಳೆ. ಇಡೀ ಕೋಣೆ ನಿಧಾನವಾಗುತ್ತದೆ.”", testimonialBy: "ಪೋಷಕರ ಹೆಸರು · ಬೆಂಗಳೂರು",
  faqEyebrow: "ಕೆಲವು ಒಳ್ಳೆಯ ಪ್ರಶ್ನೆಗಳು", faqTitle: "ಪೋಷಕರು ಆಗಾಗ ಕೇಳುವುದು",
  q1: "ಕಥಾ ಕುಟೀರ ಯಾವ ವಯಸ್ಸಿನವರಿಗೆ?", a1: "ನಮ್ಮ ಈಗಿನ ಕಥೆಗಳು 4–12 ವರ್ಷದ ಮಕ್ಕಳಿಗಾಗಿ, ಪ್ರತಿ ಕಥೆಯಲ್ಲೂ ಸ್ಪಷ್ಟ ವಯಸ್ಸಿನ ಮಾರ್ಗದರ್ಶನವಿದೆ.",
  q2: "ಯಾವ ಭಾಷೆಗಳಲ್ಲಿ ಕೇಳಬಹುದು?", a2: "ನಾವು ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಹಿಂದಿಯೊಂದಿಗೆ ಆರಂಭಿಸುತ್ತಿದ್ದೇವೆ, ಇನ್ನಷ್ಟು ಭಾರತೀಯ ಭಾಷೆಗಳು ಸೇರಲಿವೆ.",
  q3: "ಇದು ಪರದೆ-ರಹಿತ ಅನುಭವವೇ?", a3: "ಇದು ಧ್ವನಿ-ಪ್ರಧಾನ ಅನುಭವ. ಕಥೆ ಆರಿಸಿದ ನಂತರ ಮಕ್ಕಳು ಕೇಳುತ್ತಾ ಕಲ್ಪಿಸಬಹುದು.",
  q4: "ಕಥೆಗಳನ್ನು ನಂತರಕ್ಕೆ ಉಳಿಸಬಹುದೇ?", a4: "ಹೌದು. ಈ ಅವಧಿಗೆ ಮೆಚ್ಚಿನವುಗಳಿಗೆ ಸೇರಿಸಲು ಯಾವುದೇ ಕಥೆಯ ಹೃದಯ ಚಿಹ್ನೆ ಒತ್ತಿ.",
  newsEyebrow: "ನಿಮ್ಮ ಇನ್‌ಬಾಕ್ಸ್‌ಗೆ ಹೊಸ ಕಥೆ", newsTitle: "ಕಥೆಯ ಬೆಳಕನ್ನು ಉರಿಯಲು ಬಿಡಿ.",
  newsText: "ಆಗಾಗ ಹೊಸ ಕಥೆಗಳು, ಕೇಳುವ ಆಲೋಚನೆಗಳು ಮತ್ತು ಬೆಳೆಯುವ ಕಲ್ಪನೆಗಳಿಗೆ ಮೃದು ಟಿಪ್ಪಣಿಗಳು.",
  email: "ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸ", join: "ಬಳಗ ಸೇರಿ",
  footerText: "ಮಕ್ಕಳಿಗಾಗಿ ನಿರ್ಮಿಸಿದ, ಕೇಳುವ ಮಾಂತ್ರಿಕತೆಯ ಸುತ್ತ ರೂಪಿಸಿದ ಭಾರತೀಯ ಕಥೆಗಳ ಮನೆ.",
  fDiscover: "ಅನ್ವೇಷಿಸಿ", fLanguages: "ಭಾಷೆಗಳು", fAbout: "ನಮ್ಮ ಬಗ್ಗೆ", fStorytellers: "ಕಥೆಗಾರರು", fContact: "ಸಂಪರ್ಕ",
  fFamilies: "ಕುಟುಂಬಗಳಿಗೆ", fParents: "ಪೋಷಕರು", fPrivacy: "ಗೌಪ್ಯತೆ", fTerms: "ನಿಯಮಗಳು",
  copyright: "© 2026 ಕಥಾ ಕುಟೀರ. ಭಾರತದಲ್ಲಿ ಅಚ್ಚರಿಯಿಂದ ನಿರ್ಮಿತ.",
  narrating: "ಈಗ ನಿರೂಪಿಸಲಾಗುತ್ತಿದೆ", pause: "ಕಥೆ ನಿಲ್ಲಿಸಿ", resume: "ಕಥೆ ಮುಂದುವರಿಸಿ", closePlayer: "ಪ್ಲೇಯರ್ ಮುಚ್ಚಿ",
  back: "ಕಥೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ", coverFor: "ಮುಖಚಿತ್ರ", narratedBy: "ನಿರೂಪಣೆ", playStory: "ಕಥೆ ಪ್ಲೇ ಮಾಡಿ", stop: "ನಿಲ್ಲಿಸಿ",
  favStory: "ಮೆಚ್ಚಿನ ಕಥೆ", characters: "ಪಾತ್ರಗಳನ್ನು ಭೇಟಿಯಾಗಿ", readAlong: "ಜೊತೆಗೆ ಓದಿ", more: "ನಿಮಗಾಗಿ ಇನ್ನಷ್ಟು ಕಥೆಗಳು",
  categories: ["ಕಾಲಾತೀತ ಪ್ರಾಣಿಗಳ ಜ್ಞಾನ", "ತಲೆಮಾರುಗಳ ಕಥೆಗಳು", "ಅದ್ಭುತ ದಂತಕಥೆಗಳು", "ರಾಜಸಭೆಯ ಚಾತುರ್ಯ", "ದಕ್ಷಿಣದ ಚತುರ ಕಥೆಗಳು", "ಕರುಣೆಯ ಕಥೆಗಳು", "ಪ್ರತಿ ಮೂಲೆಗೂ ಒಂದು ಧ್ವನಿ", "ರಾತ್ರಿಯ ಮೃದು ಕಥೆಗಳು", "ಸಂತೋಷ, ಬೆಳಕು ಮತ್ತು ಸಂಪ್ರದಾಯ", "ಕಾಡಿನ ಅದ್ಭುತಗಳು"],
};

const hi: Dict = {
  navStories: "कहानियाँ", navCategories: "श्रेणियाँ", navJourney: "यह कैसे काम करता है", navParents: "माता-पिता के लिए",
  searchStories: "कहानियाँ खोजें", listenNow: "अभी सुनें", toggleNav: "मेनू खोलें", chooseLanguage: "भाषा चुनें",
  heroEyebrow: "भारत के हर कोने की कहानियाँ", heroTitle1: "हर कहानी का", heroTitle2: "एक घर है।",
  heroText: "कथा कुटीर बच्चों के लिए एक जादुई, ऑडियो-प्रधान अनुभव के ज़रिए भारत की कहानियों, ज्ञान और कल्पना को जीवंत करता है।",
  exploreStories: "कहानियाँ देखें", listenStory: "एक कहानी सुनें", getApp: "ऐप पाएँ", getItOn: "यहाँ पाएँ", downloadOn: "यहाँ से डाउनलोड करें",
  storiesEyebrow: "कहानी का दरवाज़ा खोलें", storiesTitle: "इस पल के लिए एक कहानी खोजें।",
  storiesText: "शांत सोने का समय, जिज्ञासु दोपहर या लंबा सफ़र—हमेशा एक कहानी इंतज़ार कर रही है।",
  searchPlaceholder: "कहानियाँ, पात्र या मनोभाव खोजें", filterLanguage: "भाषा से छाँटें", filterAge: "उम्र से छाँटें",
  allLanguages: "सभी भाषाएँ", allAges: "सभी उम्र", english: "अंग्रेज़ी", hindi: "हिंदी", ageFrom: "उम्र",
  favourite: "पसंदीदा", play: "चलाएँ", noStories: "कोई कहानी नहीं मिली। कुछ और खोजें।",
  catEyebrow: "अलमारियाँ देखें", catTitle: "कहानियों की दुनिया", catCount: "10 संग्रह · और जल्द आ रहे हैं",
  journeyEyebrow: "एक समय की बात जितना सरल", journeyTitle: "चुनें। चलाएँ। कल्पना करें।",
  step1: "कहानी चुनें", step1Text: "कोई मनोभाव, भाषा या पात्र चुनें जो जिज्ञासा जगाए।",
  step2: "चलाएँ", step2Text: "सधी हुई कथन-शैली और शांत, कम-स्क्रीन अनुभव में रम जाएँ।",
  step3: "कल्पना करें", step3Text: "हर आवाज़, जंगल और दूर की जगह को मन में खिलने दें।",
  shot1: "होम शेल्फ़", shot1Text: "कहानियाँ देखें, भाषा और उम्र से छाँटें, और एक टैप में सुनना शुरू करें।",
  shot2: "कहानी के भीतर", shot2Text: "हर कहानी के लिए कवर चित्र, कथावाचक और प्लेबैक नियंत्रण।",
  shot3: "कहीं भी ले जाएँ", shot3Text: "पूरा सुनने का कोना छोटी स्क्रीन में समा जाता है, सफ़र और सोने के समय के लिए तैयार।",
  screenshot: "कथा कुटीर ऐप स्क्रीनशॉट",
  regionEyebrow: "एक देश। हज़ारों कहानियाँ।", regionTitle1: "कई भाषाएँ।", regionTitle2: "सुनने का एक घर।",
  regionText: "कश्मीर की पहाड़ी कहानियों से केरल की चाँदनी किंवदंतियों तक, बच्चे जगह, स्मृति और कल्पना से जुड़ी आवाज़ों के ज़रिए भारत को जान सकते हैं।",
  regionCta: "क्षेत्रीय कहानियाँ देखें",
  whyEyebrow: "कथा कुटीर क्यों", whyTitle1: "ज़्यादा सुनना।", whyTitle2: "कम स्क्रीन समय।",
  why1: "मन की आँखों के लिए", why1Text: "ऑडियो बच्चों को हर पात्र और जगह की कल्पना करने का अवसर देता है।",
  why2: "अनेक भारतों में जड़ें", why2Text: "क्षेत्रीय आवाज़ें और परंपराएँ संस्कृति को पाठ नहीं, जीवंत अनुभव बनाती हैं।",
  why3: "परिवारों के लिए शांत कोना", why3Text: "सोची-समझी गति और उम्र मार्गदर्शन माता-पिता को भरोसे से चुनने में मदद करते हैं।",
  quote: "“अच्छी कहानी स्क्रीन नहीं भरती। वह कल्पना भरती है।”", quoteBy: "कथा कुटीर का सुनने का वादा",
  parentsEyebrow: "माता-पिता और कथाकारों के लिए", parentsTitle: "आवाज़ें जो बच्चे याद रखते हैं।",
  parentsText: "स्पष्ट उम्र, भाषा और अवधि मार्गदर्शन के साथ ध्यान से सुनाई गई कहानियाँ—सोने के समय, सफ़र और साथ बिताई धीमी दोपहरों के लिए।",
  parentsCta: "हमारे कथाकारों से मिलें", testimonialLabel: "माता-पिता की राय · नमूना",
  testimonial: "“हमारी बेटी एक और वीडियो के बजाय एक और कहानी माँगती है। पूरा कमरा धीमा हो जाता है।”", testimonialBy: "अभिभावक का नाम · बेंगलुरु",
  faqEyebrow: "कुछ अच्छे सवाल", faqTitle: "माता-पिता अक्सर पूछते हैं",
  q1: "कथा कुटीर किस उम्र के लिए है?", a1: "हमारी मौजूदा कहानियाँ 4–12 वर्ष के बच्चों के लिए हैं, हर कहानी पर स्पष्ट उम्र मार्गदर्शन के साथ।",
  q2: "हम किन भाषाओं में सुन सकते हैं?", a2: "हम अंग्रेज़ी और हिंदी से शुरुआत कर रहे हैं, और भी भारतीय भाषाएँ जुड़ रही हैं।",
  q3: "क्या यह स्क्रीन-मुक्त अनुभव है?", a3: "यह ऑडियो-प्रधान अनुभव है। कहानी चुनने के बाद बच्चे बस सुनकर कल्पना कर सकते हैं।",
  q4: "क्या मैं कहानियाँ बाद के लिए सहेज सकता हूँ?", a4: "हाँ। इस सत्र के पसंदीदा में जोड़ने के लिए किसी भी कहानी पर दिल दबाएँ।",
  newsEyebrow: "आपके इनबॉक्स में नई कहानी", newsTitle: "कहानी का दीया जलाए रखें।",
  newsText: "कभी-कभार नई कहानियाँ, सुनने के विचार और बढ़ती कल्पनाओं के लिए कोमल संदेश।",
  email: "आपका ईमेल पता", join: "मंडली से जुड़ें",
  footerText: "भारतीय कहानियों का घर, बच्चों के लिए बना और सुनने के जादू के इर्द-गिर्द रचा गया।",
  fDiscover: "खोजें", fLanguages: "भाषाएँ", fAbout: "हमारे बारे में", fStorytellers: "कथाकार", fContact: "संपर्क",
  fFamilies: "परिवारों के लिए", fParents: "माता-पिता", fPrivacy: "गोपनीयता", fTerms: "शर्तें",
  copyright: "© 2026 कथा कुटीर। भारत में अचरज के साथ बनाया गया।",
  narrating: "अभी सुनाई जा रही है", pause: "कहानी रोकें", resume: "कहानी जारी रखें", closePlayer: "प्लेयर बंद करें",
  back: "कहानियों पर वापस", coverFor: "कवर चित्र", narratedBy: "कथावाचक", playStory: "कहानी चलाएँ", stop: "रोकें",
  favStory: "पसंदीदा कहानी", characters: "पात्रों से मिलें", readAlong: "साथ में पढ़ें", more: "आपके लिए और कहानियाँ",
  categories: ["सदा की पशु बुद्धि", "पीढ़ियों से चली कहानियाँ", "विस्मय भरी कथाएँ", "शाही दरबार की चतुराई", "दक्षिण की चतुर कहानियाँ", "करुणा की कहानियाँ", "हर कोने की एक आवाज़", "रात की कोमल कहानियाँ", "ख़ुशी, उजाला और परंपरा", "जंगल के अनोखे किस्से"],
};

const dicts: Record<Lang, Dict> = { en, kn, hi };
const KEY = "katha-lang";

type FullDict = Dict & (typeof positioning)["en"];
const full = (l: Lang): FullDict => ({ ...dicts[l], ...positioning[l] });
const I18nContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: FullDict }>({ lang: "en", setLang: () => {}, t: full("en") });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem(KEY) as Lang | null;
    if (saved && saved in dicts) setLangState(saved);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem(KEY, l); };
  return <I18nContext.Provider value={{ lang, setLang, t: full(lang) }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);

export function LanguageSelect({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return <label className={className}><span className="sr-only">{t.chooseLanguage}</span>
    <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label={t.chooseLanguage} className="h-9 rounded-md border border-border bg-background px-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
      {languages.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
    </select></label>;
}
