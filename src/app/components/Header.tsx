import Link from "next/link";

interface HeaderProps {
  page: string;
}

export default function Header(props: HeaderProps) {
  return (
    <header className="bg-gray-800 text-white flex justify-end">
      <h1>Narrative Nexus</h1>
      {props.page === "home" ? (
        <p>
          <Link href="/login">Login</Link>
        </p>
      ) : (
        <p>
          <Link href="/">Home</Link>
        </p>
      )}
    </header>
  );
}
