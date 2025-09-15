import { useEffect, useState } from "hono/jsx";

type MoodProps = {
  data: string[];
};

const saveMoodHistory = (m: string) => {
  if (typeof window === "undefined") return;
  const today = new Date().toISOString().split("T")[0];
  const history = JSON.parse(localStorage.getItem("moodHistory") || "[]");
};

export const Mood = ({ data }: MoodProps) => {
  const [mood, setMood] = useState("");
  const [speak, setSpeak] = useState("");

  useEffect(() => {
    handleVoiceMood();
  }, [speak]);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const value = target.value.toLowerCase();
    setMood(value);
    saveMoodHistory(value);

    if (value) {
      window.location.href = `/playlist/playlist?mood=${value}`;
    }
  };

  const handleVoiceMood = () => {
    const synth = window.speechSynthesis;
    synth.speak(new SpeechSynthesisUtterance("How is your mood?"));

    const recognition = new ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition)();
    recognition.lang = "hi-IN";
    recognition.start();

    recognition.onresult = (event: any) => {
      const answer = event.results[0][0].transcript.toLowerCase();
      console.log(answer);

      const answermood = data.find((m) => answer.includes(m.toLowerCase()));
      if (answermood) {
        setMood(answermood.toLowerCase());
        setSpeak(answermood);
        saveMoodHistory(answermood.toLowerCase());
        window.location.href = `/playlist/playlist?mood=${answermood.toLowerCase()}`;
      } else {
        alert("please tell me again!");
      }
    };

    recognition.onerror = (e: any) => {
      console.error("Voice recognition error:", e.error);
    };
  };

  return (
    <div class="flex flex-col gap-2 max-w-sm mx-auto ">
      <select
        value={mood}
        onChange={handleChange}
        class="border px-3 py-2 rounded text-sm max-md:"
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
        class="w-full  bg-green-400 text-white text-sm px-2 py-2 rounded mt-2 width"
      >
        <p>{speak ? `You said: ${speak}` : "tell me "}</p>
      </button>
    </div>
  );
};
