import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to a default wedding page
  // In production, this could redirect to a landing page or wedding selection page
  redirect("/default-wedding");
}
