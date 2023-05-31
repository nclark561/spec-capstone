import Link from "next/link";

interface HeaderProps {
  page: string;
}

export default function Header(props: HeaderProps) {
  return (
    <header className="bg-gray-800 text-white flex justify-between h-[5vw] items-center">
      <h1 className="m-[4vw] text-2xl">Narrative Nexus</h1>
      {props.page === "home" ? (
        <p className="m-[5vw] anime">
          <Link href="/login">Login</Link>
        </p>
      ) : (
        <p className="m-[5vw] anime">
          <Link href="/">Home</Link>
        </p>
      )}
    </header>
  );
}
