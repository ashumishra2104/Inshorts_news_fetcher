import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NewsFeed } from "@/components/news/NewsFeed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Newsvala — Stay Informed" },
      {
        name: "description",
        content:
          "Newsvala delivers bite-sized breaking news in a swipeable, full-screen feed.",
      },
      { property: "og:title", content: "Newsvala — Stay Informed" },
      {
        property: "og:description",
        content:
          "Swipe through the day's biggest stories in tech, economy, and breaking news.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem("newsvala:welcomed");
      if (!seen) {
        navigate({ to: "/welcome", replace: true });
        return;
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, [navigate]);

  if (!ready) {
    return <div className="min-h-dvh bg-surface" />;
  }
  return <NewsFeed />;
}
