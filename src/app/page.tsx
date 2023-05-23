import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1> HOME</h1>
      <div>
        <Link href="/register">Register</Link>
        <Link href="/login">Login</Link>
      </div>
    </main>
  );
}
