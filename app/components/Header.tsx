import { Link } from "honox/server";


type HeaderProps = {
  login: boolean;
};

export function Header({ login }: HeaderProps) {
  return (
    <header class="flex justify-between items-center p-4 bg-gray-200">
      <h1 class="text-xl font-bold">AG</h1>

      {login ? (
        <Link href="/logout" class="text-yellow-600">
          Logout
        </Link>
      ) : (
        <Link href="/oauth/authorize" class="text-yellow-600">
          Login
        </Link>
      )}
    </header>
  );
}
