export const songs: Record<
  string,
  { id: number; title: string; url: string }[]
> = {
  sad: [
    {
      id: 1,
      title: "Sad Song 1",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    },
    {
      id: 2,
      title: "Sad Song 2",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
  ],
  happy: [
    {
      id: 1,
      title: "Happy Song 1",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      id: 2,
      title: "Happy Song 2",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
  ],
  motivation: [
    {
      id: 1,
      title: "Motivation Song 1",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
  ],
  relax: [
    {
      id: 1,
      title: "Relax Song",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    },
  ],
  party: [
    {
      id: 1,
      title: "Party Song",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    },
  ],
};
