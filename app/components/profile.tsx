export const ProfileIcon = (props: { class?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class={`w-6 h-6 ${props.class ?? ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
    />

    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6"
    />
  </svg>
);
