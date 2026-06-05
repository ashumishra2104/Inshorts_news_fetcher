import { createFileRoute } from "@tanstack/react-router";
import { WelcomeScreen } from "@/components/welcome/WelcomeScreen";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome to Newsvala" },
      {
        name: "description",
        content:
          "Your daily news, condensed and curated. Fast, reliable, bite-sized.",
      },
      { property: "og:title", content: "Welcome to Newsvala" },
      {
        property: "og:description",
        content: "Your daily news, condensed and curated.",
      },
    ],
  }),
  component: WelcomeScreen,
});
