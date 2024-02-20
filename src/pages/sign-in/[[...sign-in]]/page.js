import { SignIn } from "@clerk/nextjs";
export default function sign_in() {
    return (
      <>
        <SignIn afterSignInUrl='/'/>
      </>
    );
  }