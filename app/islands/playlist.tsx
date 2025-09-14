import { useEffect, useRef } from "hono/jsx";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { songs as allSongs } from "../../public/songs";

interface Props {
  mood: string;
}

export default function Playlist({ mood }: Props) {
  const audioRefs = useRef<HTMLAudioElement[]>([]);

  const selectmood = mood === "sad" ? "motivation" : mood;
  const moodSongs = allSongs[selectmood as keyof typeof allSongs] || [];
  console.log(moodSongs);
  const handlePlay = (index: number) => {
    audioRefs.current!.forEach((audio, i) => {
      if (i !== index && audio) {
        audio.pause();
        audio.currentTime = 0; // reset
      }
    });
  };

  // autoplay first song when mood changes
  useEffect(() => {
    const firstAudio = audioRefs.current![0];
    if (firstAudio) {
      firstAudio
        .play()
        .catch(() =>
          console.log("Autoplay blocked by browser, user interaction needed")
        );
    }
  }, [selectmood]);

  return (
    <div class="p-6">
      <Header login />
      <h2 class="text-2xl mb-4 font-bold">Playlist Songs 🎵</h2>

      {!moodSongs.length && (
        <p class="text-center">No songs found for this mood</p>
      )}

      <ul class="space-y-4">
        {moodSongs.map((song, index) => (
          <li key={song.id} class="flex flex-col items-start">
            <p class="font-semibold">{song.title}</p>
            <audio
              ref={(el: any) => {
                if (el) audioRefs.current![index] = el;
              }}
              controls
              src={song.url}
              onPlay={() => handlePlay(index)}
              class="w-full mt-2"
            />
          </li>
        ))}
      </ul>

      <Footer />
    </div>
  );
}
