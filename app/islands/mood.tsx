import { useState } from "hono/jsx";

type MoodProps = {
  data: string[];
};

export const Mood = ({ data }: MoodProps) => {
  const [mood, setMood] = useState("");

  const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const value = target.value.toLowerCase(); // lowercase store karna zaroori hai
    setMood(value);
    console.log(value);

    if (value) {
      window.location.href = `/playlist?mood=${1}`;
    }
  };

  return (
    <select
      value={mood}
      onChange={handleChange}
      class="border px-3 py-2 rounded"
    >
      <option value="">-- Select Mood --</option>
      {data.map((item, index) => (
        <option key={index} value={item.toLowerCase()}>
          {item}
        </option>
      ))}
    </select>
  );
};
