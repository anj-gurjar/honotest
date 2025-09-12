import Raect, { useState } from "react";
type MoodeProps = {
  data: string[];
};

export const Mood = ({ data }: MoodeProps) => {
  const [mood, setMood] = useState("");
  const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    setMood(target.value);
    window.location.href = `/playlist?mood=${target.value}`;
  };

  return (
    <div>
      {data && data.length > 0 && (
        <select
          value={mood}
          onChange={handleChange}
          class="border px-3 rounded"
        >
          <option value="">
            {" "}
            select mood
            {data.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </option>
        </select>
      )}
    </div>
  );
};
