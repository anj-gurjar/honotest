import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { songs as allSongs } from "../../public/songs";
import { useEffect, useRef, useState } from "hono/jsx";

export default function Playlist() {
  const [mood, setMood] = useState("sad"); // default
  const audioRefs = useRef<HTMLAudioElement[]>([]);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      let m = params.get("mood") || "sad";

      const moodMap: Record<string, string> = {
        "1": "sad",
        "2": "happy",
        "3": "motivation",
      };

      if (moodMap[m]) {
        m = moodMap[m];
      }

      setMood(m);
    }
  }, []);

  if(mood==='sad'){
    
  }
  const selectmood = mood === "sad" ? "motivation" : mood;
  const moodSongs = allSongs[selectmood as keyof typeof allSongs] || [];

  const handlePlay = (index: number) => {
    audioRefs.current!.forEach((audio, i) => {
      if (i !== index && audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  // autoplay first song
  useEffect(() => {
    if (moodSongs.length > 0) {
      const firstAudio = audioRefs.current![0];
      if (firstAudio) {
        firstAudio
          .play()
          .catch(() => console.log("Autoplay blocked by browser"));
      }
    }
  }, [selectmood]);

  return (
    <div className="p-6">
      <Header />
      <h2 className="text-2xl mb-4 font-bold">Playlist Songs 🎵</h2>

      {!moodSongs.length && (
        <p className="text-center">No songs found for this mood</p>
      )}

      <ul className="space-y-4">
        {moodSongs.map((song, index) => (
          <li key={song.id} className="flex flex-col items-start">
            <p className="font-semibold">{song.title}</p>
            <audio
              ref={(el: any) => {
                if (el) audioRefs.current![index] = el;
              }}
              controls
              src={song.url}
              onPlay={() => handlePlay(index)}
              className="w-full mt-2"
            />
          </li>
        ))}
      </ul>

      <Footer />
    </div>
  );
}
