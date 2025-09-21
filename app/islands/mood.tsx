import { useEffect, useState } from "hono/jsx";

type MoodProps = {
  data: string[];
};

export const Mood = ({ data }: MoodProps) => {
  const [mood, setMood] = useState("");
  const [speak, setSpeak] = useState("");
  const [isBreathing, setIsBreathing] = useState(false);

  // Triggered automatically when `speak` changes
  useEffect(() => {
    if (speak) {
      startBreathSession(speak);
    }
  }, [speak]); // <- dependency array ensures it runs only when `speak` updates

  const saveMoodHistory = (m: string) => {
    if (typeof window === "undefined") return;
    const today = new Date().toISOString().split("T")[0];
    const history = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    history.push({ date: today, mood: m });
    localStorage.setItem("moodHistory", JSON.stringify(history));
  };

  const startBreathSession = (selectedMood: string) => {
    setIsBreathing(true);
    setTimeout(() => {
      setIsBreathing(false);
      window.location.href = `/playlist/playlist?mood=${selectedMood}`;
    }, 3000); // 3-second breathing
  };

  const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const value = target.value.toLowerCase();
    setMood(value);
    setSpeak(value); // <- triggers useEffect automatically
    saveMoodHistory(value);
  };

  const handleVoiceMood = () => {
    const msg = new SpeechSynthesisUtterance("Tell me your mood");
    window.speechSynthesis.speak(msg);

    const recognition = new ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition)();
    recognition.lang = "hi-IN";
    recognition.start();

    recognition.onresult = (event: any) => {
      const answer = event.results[0][0].transcript.toLowerCase();
      const answermood = data.find((m) => answer.includes(m.toLowerCase()));
      if (answermood) {
        setMood(answermood.toLowerCase());
        setSpeak(answermood); // <- triggers useEffect automatically
        saveMoodHistory(answermood.toLowerCase());
      } else {
        alert("Please tell me again!");
      }
    };

    recognition.onerror = (e: any) => {
      console.error("Voice recognition error:", e.error);
    };
  };

  return (
    <div class="flex flex-col gap-2 max-w-sm mx-auto">
      <select
        value={mood}
        onChange={handleChange}
        class="border px-3 py-2 rounded text-sm"
      >
        <option value="">-- Select Mood --</option>
        {data.map((item, index) => (
          <option key={index} value={item.toLowerCase()}>
            {item}
          </option>
        ))}
      </select>

      <button
        onClick={handleVoiceMood}
        class="w-full bg-green-400 text-white text-sm px-2 py-2 rounded mt-2"
      >
        {isBreathing
          ? "Breathing in... Exhale..."
          : speak
          ? `You said: ${speak}`
          : "Tell me your mood"}
      </button>
    </div>
  );
};
