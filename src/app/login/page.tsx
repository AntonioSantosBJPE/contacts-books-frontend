import { Header } from "@/components/Header";
export default function LoginPage() {
  return (
    <>
      <Header
        leftLinkName="Register"
        leftLinkHref="/register"
        rightLinkName="Home"
        rightLinkHref="/"
      />
      <main>
        <h1> Login</h1>
      </main>
    </>
  );
}
