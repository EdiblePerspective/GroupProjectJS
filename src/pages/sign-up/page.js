import { SignUp } from "@clerk/nextjs";
export default function sign_up() {
    return (
      <>
        <SignUp afterSignUpUrl='/'/>
      </>
    );
  }