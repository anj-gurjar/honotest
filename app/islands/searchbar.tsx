import { KeyboardEvent, useState } from "hono/jsx";
import { SearchIcon } from "../components/searchIcon";

export const SearchBar = () => {
  const [input, setInput] = useState<string>("");

  const handleSearchQuery = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setInput(target.value);
  };
  const handleEnterKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    } else return;
  };

  return (
    <div class="flex items-right border  rounded-md mt-2.5 h-[40px] px-2 w-full max-w-sm">
      <SearchIcon class="mt-3.5 text-blue-200"></SearchIcon>
      <input
        type="text"
        value={input}
        onKeyDown={handleEnterKey}
        onInput={handleSearchQuery}
        placeholder="Search..."
      />
    </div>
  );
};
