"use client";
import { useFormStatus } from "react-dom";

export default function SaveReviewButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Adding your Review" : "Save Review"}
    </button>
  );
}
