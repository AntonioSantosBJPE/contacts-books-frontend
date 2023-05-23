import Link from "next/link";
export default function LoginPage() {
  return (
    <main>
      <h1> Login</h1>
      <div>
        <Link href="/register">Register</Link>
        <Link href="/">Home</Link>
      </div>
    </main>
  );
}
