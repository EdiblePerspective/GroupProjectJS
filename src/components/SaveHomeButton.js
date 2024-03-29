"use client";
import { useFormStatus } from "react-dom";

export default function SaveHomeButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Adding your host" : "Save host"}
    </button>
  );
}
