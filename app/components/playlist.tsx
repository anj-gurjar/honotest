export const songs = {
  sad: [
    {
      id: 1,
      title: "Sad",
      url: "https://youtu.be/0Io7GJmjhzo?si=Y3cf3Z5CzvxD67y-",
    },
    {
      id: 2,
      title: "Sad",
      url: "https://youtu.be/0Io7GJmjhzo?si=Y3cf3Z5CzvxD67y-",
    },
  ],
  happy: [
    { id: 1, title: "Happy Song 1", url: "/songs/happy1.mp3" },
    { id: 2, title: "Happy Song 2", url: "/songs/happy2.mp3" },
  ],
  spiritual: [
    { id: 1, title: "Bhajan 1", url: "/songs/bhajan1.mp3" },
    { id: 2, title: "Bhajan 2", url: "/songs/bhajan2.mp3" },
  ],
  excited: [],
  relaxed: [],
};

interface Props {
  mood: string;
}

export default function Playlist({ mood }: Props) {
  const moodSongs = songs[mood as keyof typeof songs] || [];

  if (!moodSongs.length) {
    return <p class="p-6 text-center">No songs found for mood "{mood}"</p>;
  }

  return (
    <div class="p-6">
      <h2 class="text-2xl mb-4 font-bold">
        Playlist for {mood.toUpperCase()} 🎵
      </h2>
      <ul class="space-y-4">
        {moodSongs.map((song) => (
          <li key={song.id} class="flex flex-col items-start">
            <p class="font-semibold">{song.title}</p>
            <audio controls src={song.url} class="w-full mt-2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
