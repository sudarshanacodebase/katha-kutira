import blueJackal from "@/assets/story-blue-jackal.jpg";
import lamp from "@/assets/story-lamp.jpg";
import tenali from "@/assets/story-tenali.jpg";

export type Story = {
  slug: string;
  title: string;
  description: string;
  artwork: string;
  duration: string;
  language: string;
  ageGroup: string;
  category: string;
  region: string;
  characters: string[];
  themes: string[];
  narrator: string;
};

export const stories: Story[] = [
  {
    slug: "the-blue-jackal",
    title: "The Blue Jackal",
    description: "A moonlit Panchatantra tale about a jackal who discovers that being yourself is the bravest thing of all.",
    artwork: blueJackal,
    duration: "8 min",
    language: "English",
    ageGroup: "5–8 yrs",
    category: "Panchatantra",
    region: "Ancient India",
    characters: ["Chandrika", "The forest animals"],
    themes: ["Honesty", "Courage"],
    narrator: "Meera Iyer",
  },
  {
    slug: "the-lamp-that-listened",
    title: "The Lamp That Listened",
    description: "In a quiet Konkan village, Tara learns that listening closely can light the way home.",
    artwork: lamp,
    duration: "11 min",
    language: "Hindi",
    ageGroup: "6–10 yrs",
    category: "Indian Folktales",
    region: "Maharashtra",
    characters: ["Tara", "Aaji", "The little lamp"],
    themes: ["Kindness", "Wonder"],
    narrator: "Nandita Das",
  },
  {
    slug: "tenali-and-the-mango-tree",
    title: "Tenali & the Mango Tree",
    description: "Tenali’s quick wit turns a royal puzzle into a lesson about sharing what grows around us.",
    artwork: tenali,
    duration: "9 min",
    language: "English",
    ageGroup: "7–11 yrs",
    category: "Tenali Rama",
    region: "Karnataka",
    characters: ["Tenali Rama", "King Krishnadevaraya"],
    themes: ["Wit", "Generosity"],
    narrator: "Rahul Vohra",
  },
];

export const categories = [
  ["Panchatantra", "Timeless animal wisdom", "🐘"],
  ["Indian Folktales", "Tales passed down", "🌳"],
  ["Mythology", "Wonder-filled legends", "✨"],
  ["Akbar & Birbal", "Wit in the royal court", "👑"],
  ["Tenali Rama", "Clever southern tales", "🥭"],
  ["Jataka Tales", "Stories of compassion", "🦌"],
  ["Regional Stories", "Every corner, a voice", "🪷"],
  ["Bedtime Stories", "Gentle tales for night", "🌙"],
  ["Festival Stories", "Joy, light and tradition", "🪔"],
  ["Animal Stories", "Wild and wonderful", "🦚"],
] as const;