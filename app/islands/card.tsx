import { useState } from "hono/jsx";

export const Card = (props: { class: string }) => {
  const [item, setItem] = useState([""]);
  const handleonClick = (e: Event) => {
    const data: any = e.target as HTMLInputElement;
    setItem(data);
  };

  return (
    <div class=" flex items-center justify-center h-screen gap-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="black"
      >
        <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
      </svg>
      <div class="w-50 rounded-xl overflow-hidden shodow-lg bg-blue-300 ">
        <img class="w-full" src="https://via.placehold.com" alt="Card"></img>
        <p class="p-4">
          <h2 class="text-xl font-bold mb-2 text-gray-800">Title</h2>
          <p class="text-gray-700 text-base">This is the best old</p>
          <button class="mt-2 py-3 px-7 rounded-2xl" onClick={handleonClick}>
            Action
          </button>
        </p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="black"
      >
        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
      </svg>
    </div>
  );
};
