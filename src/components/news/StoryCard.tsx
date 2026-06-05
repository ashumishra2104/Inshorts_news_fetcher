import { useState } from "react";
import type { Story } from "@/data/stories";

const chipStyles: Record<Story["categoryStyle"], string> = {
  primary: "bg-primary text-on-primary",
  critical: "bg-status-critical text-on-primary",
  tertiary: "bg-tertiary text-on-tertiary",
};

export function StoryCard({ story }: { story: Story }) {
  const [bookmarked, setBookmarked] = useState(false);

  const isExternalLink = story.id.startsWith("http");
  const articleUrl = isExternalLink
    ? story.id
    : `https://www.google.com/search?q=${encodeURIComponent(story.headline)}`;

  return (
    <article className="snap-start h-[calc(100dvh-128px)] min-h-[calc(100dvh-128px)] w-full flex flex-col bg-surface-container-lowest">
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={story.image}
          alt={story.headline}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-[12px] font-bold tracking-wider uppercase ${chipStyles[story.categoryStyle]}`}
          >
            {story.category}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-5 min-h-0">
        <h2 className="font-headline text-[20px] font-bold leading-tight mb-3 text-on-surface">
          {story.headline}
        </h2>
        <p className="font-body text-[15px] leading-6 text-text-muted flex-1 overflow-hidden">
          {story.summary}
        </p>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-surface-variant">
          <span className="font-body text-[12px] font-bold tracking-wider uppercase text-secondary">
            Source: {story.source}
          </span>
          <div className="flex gap-4">
            <a
              href={articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="active:scale-90 transition-transform text-on-surface flex items-center justify-center"
              aria-label="Read full article"
            >
              <span className="material-symbols-outlined text-[24px]">
                open_in_new
              </span>
            </a>
            <button
              className="active:scale-90 transition-transform text-on-surface"
              aria-label="Share"
            >
              <span className="material-symbols-outlined text-[24px]">
                share
              </span>
            </button>
            <button
              onClick={() => setBookmarked((b) => !b)}
              className={`active:scale-90 transition-transform ${bookmarked ? "text-primary" : "text-on-surface"}`}
              aria-label="Bookmark"
            >
              <span
                className={`material-symbols-outlined text-[24px] ${bookmarked ? "filled" : ""}`}
              >
                bookmark
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
