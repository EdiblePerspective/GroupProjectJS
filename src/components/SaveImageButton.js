"use client";
import { useFormStatus } from "react-dom";

export default function SaveImageButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Adding your Image" : "Save Image"}
    </button>
  );
}
