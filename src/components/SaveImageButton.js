"use client";
import { useFormStatus } from "react-dom";

export default function SaveRecipeButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={pending ? "disabled" : ""}>
      {pending ? "Adding your recipe" : "Save Recipe"}
    </button>
  );
}
