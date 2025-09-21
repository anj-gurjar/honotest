type searProps = {
  class: string;
};

export const SearchIcon = ({ class: classname }: searProps) => {
  return (
    <svg
      class={classname}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 45 45"
      magin
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
      />
    </svg>
  );
};
