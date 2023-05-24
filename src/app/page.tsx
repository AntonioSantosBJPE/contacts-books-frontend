import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header
        leftLinkName="Register"
        leftLinkHref="/register"
        rightLinkName="Login"
        rightLinkHref="/login"
      />
      <main>
        <h1> HOME</h1>
      </main>
    </>
  );
}
