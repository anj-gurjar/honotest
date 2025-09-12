import { createRoute } from "honox/factory";
import { Mood } from "../../islands/mood";

const GET = createRoute(async (c) => {});
const moods = ["Happy", " Sad", " Spiritual", " Excited", " Relaxed"];

export const moodPage = () => {
  return (
    <div>
      <Mood data={moods} />
    </div>
  );
};
