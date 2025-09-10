import { useState } from "preact/hooks";

export default function MoodSelector() {
  const [mood, setMood] = useState<string>("");

  const playlists: Record<string, string[]> = {
    Sad: [
      "https://www.youtube.com/watch?v=mgmVOuLgFB0",
      "https://www.youtube.com/watch?v=wnHW6o8WMas",
    ],
    Happy: [
      "https://www.youtube.com/watch?v=ZbZSe6N_BXs",
      "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",
    ],
    Spiritual: [
      "https://www.youtube.com/watch?v=yx5m-0E-5zI",
      "https://www.youtube.com/watch?v=U1Fgb6BjgZo",
    ],
    Chill: [
      "https://www.youtube.com/watch?v=DWcJFNfaw9c",
      "https://www.youtube.com/watch?v=kgx4WGK0oNU",
    ],
  };

  return (
    <div class="mt-8 text-center">
      <h2 class="text-2xl font-semibold">How’s your mood today?</h2>

      <select
        class="mt-4 border rounded px-3 py-2"
        onChange={(e) => setMood((e.target as HTMLSelectElement).value)}
      >
        <option value="">-- Select Mood --</option>
        <option value="Sad">😢 Sad</option>
        <option value="Happy">😊 Happy</option>
        <option value="Spiritual">🕉️ Spiritual</option>
        <option value="Chill">😎 Chill</option>
      </select>

      {mood && (
        <div class="mt-6">
          <p class="text-lg font-medium">
            {mood === "Sad"
              ? "✨ Motivational Songs for You"
              : `Songs for your ${mood} mood 🎶`}
          </p>

          <ul class="mt-4 space-y-2">
            {playlists[mood].map((link, i) => (
              <li key={i}>
                <a
                  href={link}
                  target="_blank"
                  class="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Play Song {i + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
