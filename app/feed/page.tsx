import { redirect } from "next/navigation";

export default function FeedPage() {
  // For the demo, we redirect to a project's live feed or show a global one.
  // We'll redirect to the first project's detail page with the Live Feed tab active.
  redirect("/projects/p1?tab=Live%20Feed");
}
