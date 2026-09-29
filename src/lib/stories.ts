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
  storyText: string;
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
    storyText: "Once upon a time, in a forest at the edge of a wide golden plain, there lived a jackal named Chandrika. He was small and quick, and every night he crept into the village to look for food. One moonless night, as Chandrika sniffed around the dyer's yard, he heard the barking of dogs. He ran — splash! — straight into a great vat of indigo dye. He tumbled out, blue from ear to tail, and raced back to the forest. When the animals saw him, they gasped. \"A blue creature!\" they cried. \"We have never seen his like. Perhaps he has come from the sky. Perhaps he should be our king!\" Chandrika stood very still. The blue felt strange and powerful. \"I am sent from the heavens,\" he said, \"and you must serve me.\" So the lion brought him food. The tiger guarded his den. Even the elephant bowed. Only the jackals were not sure. One evening, under a fat orange moon, the jackals howled their long, lonely song. And Chandrika — before he could stop himself — howled too. The forest went silent. \"A jackal!\" the animals cried. \"Our king is only a jackal!\" And they chased him to the very edge of the forest. Chandrika washed in the river until the blue faded away, and he never pretended to be anyone but himself again. Because being yourself is the bravest thing of all. The end.",
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
    storyText: "एक छोटे से कोंकण गाँव में, समुद्र के किनारे, तारा नाम की एक लड़की रहती थी। उसकी आजी रोज़ शाम को एक छोटे दीये की बाती जलाती और कहानियाँ सुनाती। \"सुनो,\" आजी कहती, \"दीया सिर्फ़ रोशनी नहीं देता — वह सुनता भी है।\" एक रात आजी बाज़ार से देर से लौट रही थी। आसमान में बादल छा गए, और रास्ता अंधेरे में डूब गया। घर पर तारा चिंतित थी। उसने छोटे दीये को उठाया और धीरे से कहा, \"दीया, आजी को घर लाना है। क्या तुम सुन सकते हो?\" दीये की लौ काँपी, फिर सीधी हो गई। तारा दीये के साथ कदम रखती गई — और दीया सुनता गया: पगडंडी की गीली मिट्टी, आम के पेड़ की पत्तियाँ, दूर लहरों की आवाज़। हर आवाज़ ने उन्हें सही रास्ता दिखाया। आख़िर में उन्होंने आजी को देखा — पल्लू ओढ़े, मंदिर की सीढ़ियों पर बैठी। \"तारा!\" आजी हँसी, \"तुम अकेली आई?\" \"नहीं,\" तारा मुस्कुराई, \"दीये के साथ आई हूँ। वह सुनता है, ना?\" उस रात के बाद गाँव के सारे बच्चे जान गए — जो ध्यान से सुनता है, वह कभी रास्ते में नहीं खोता। समाप्त।",
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
    storyText: "In the golden city of Vijayanagara, King Krishnadevaraya loved puzzles as much as mangoes. One hot afternoon, a farmer came to court with a complaint. \"Your Majesty, my neighbour's mango tree leans over my wall, and its sweetest fruit falls in MY yard. But the tree is his. Who do the mangoes belong to?\" The court buzzed. The ministers argued about walls, roots and shadows. The king rubbed his chin. \"Tenali Rama,\" he said, \"settle this.\" Tenali thought for a moment, then asked the farmer, \"When the tree is thirsty, whose well do you draw water from?\" \"The neighbour's,\" admitted the farmer, \"when he is away.\" \"And when the tree drops its dry leaves, whose yard do they clutter?\" The neighbour stepped forward. \"The farmer's! Every autumn!\" Tenali smiled. \"Then the tree has been sharing all along — its shade, its leaves, its thirst, its sweetness. The mangoes were simply the last gift to arrive.\" The king laughed so hard his crown slipped. \"Then let the two neighbours share a basket each season,\" he declared, \"and eat it together under the tree.\" From that day, the mango tree's shade held two families, one swing, and more laughter than fruit. Because what grows around us grows sweeter when it is shared. The end.",
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
