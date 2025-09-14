import { createRoute } from "honox/factory";
import Playlist from "../../islands/playlist";

export default createRoute((c) => {
  const url = new URL(c.req.url);
  const mood = url.searchParams.get("mood") || "";
  return c.render(<Playlist mood={mood} />);
});
