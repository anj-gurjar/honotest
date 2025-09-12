import Playlist from "../../islands/playlist";

export default function PlaylistPage(c: any) {
  const url = new URL(c.req.url);
  const mood = url.searchParams.get("mood") || "";

  return (
    <div class="flex justify-center items-center min-h-screen bg-gray-50">
      <Playlist mood={mood} />
    </div>
  );
}
