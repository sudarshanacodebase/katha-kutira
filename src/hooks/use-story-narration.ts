import { useCallback, useEffect, useState } from "react";
import type { Story } from "@/lib/stories";

/**
 * Shared text-to-speech narration. Every story player uses this hook so the
 * spoken text and the on-page story text always come from the same
 * story.storyText source.
 */
export function useStoryNarration() {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const play = useCallback((story: Story) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(story.storyText);
    utterance.lang = story.language === "Hindi" ? "hi-IN" : "en-IN";
    utterance.rate = 0.88;
    utterance.pitch = 1.02;
    const finish = () => {
      setActiveStory(null);
      setIsPaused(false);
    };
    utterance.onend = finish;
    utterance.onerror = finish;
    setActiveStory(story);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const togglePause = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setActiveStory(null);
    setIsPaused(false);
  }, []);

  return { activeStory, isPaused, play, togglePause, stop };
}
