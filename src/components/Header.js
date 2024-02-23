import { UserButton } from "@clerk/nextjs";
export default function Header() {
  return (
    <header>
      <UserButton afterSignOutUrl="/" />
      <h1>R B and D</h1>
    </header>
  );
}
