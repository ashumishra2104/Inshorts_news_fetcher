import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "@/lib/api/news";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { StoryCard } from "./StoryCard";
import { SwipeHint } from "./SwipeHint";

function StorySkeleton() {
  return (
    <div className="w-full h-[calc(100dvh-128px)] min-h-[calc(100dvh-128px)] flex flex-col bg-surface-container-lowest animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full aspect-video bg-surface-container-highest flex items-center justify-center">
        <div className="absolute top-4 left-4 w-20 h-6 bg-surface-container-high rounded-full" />
      </div>
      
      {/* Content skeleton */}
      <div className="flex-1 flex flex-col p-5 min-h-0">
        {/* Headline */}
        <div className="w-3/4 h-6 bg-surface-container-highest rounded mb-2" />
        <div className="w-5/6 h-6 bg-surface-container-highest rounded mb-4" />
        
        {/* Summary */}
        <div className="w-full h-4 bg-surface-container-high rounded mb-2.5" />
        <div className="w-full h-4 bg-surface-container-high rounded mb-2.5" />
        <div className="w-11/12 h-4 bg-surface-container-high rounded mb-2.5" />
        <div className="w-4/5 h-4 bg-surface-container-high rounded mb-2.5" />
        
        <div className="flex-1" />
        
        {/* Bottom row */}
        <div className="flex items-center justify-between pt-4 border-t border-surface-variant">
          <div className="w-24 h-4 bg-surface-container-high rounded" />
          <div className="flex gap-4">
            <div className="w-6 h-6 bg-surface-container-high rounded-full" />
            <div className="w-6 h-6 bg-surface-container-high rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function NewsFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hintVisible, setHintVisible] = useState(true);
  const [warningDismissed, setWarningDismissed] = useState(false);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["news"],
    queryFn: () => getNews(),
    staleTime: 5 * 60 * 1000, // 5 minutes cache on client
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setHintVisible(el.scrollTop < 50);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const displayStories = data?.stories || [];
  const warning = data?.warning;

  return (
    <div className="min-h-dvh bg-neutral-900 flex justify-center">
      <div className="relative w-full max-w-[480px] h-dvh bg-surface overflow-hidden shadow-2xl">
        <TopBar onRefresh={refetch} isRefreshing={isFetching} />
        
        {warning && !warningDismissed && (
          <div className="absolute top-16 inset-x-0 z-40 bg-status-critical/10 backdrop-blur-md border-b border-status-critical/20 px-4 py-2 flex items-center justify-between gap-2.5 text-[12px] font-medium text-status-critical animate-in fade-in slide-in-from-top duration-300">
            <div className="flex items-center gap-2.5 truncate">
              <span className="material-symbols-outlined text-[16px] text-status-critical leading-none">
                warning
              </span>
              <span className="truncate">{warning}</span>
            </div>
            <button 
              onClick={() => setWarningDismissed(true)}
              className="p-1 -mr-1 hover:bg-status-critical/10 rounded-full active:scale-95 transition-transform"
              aria-label="Dismiss"
            >
              <span className="material-symbols-outlined text-[16px] text-status-critical leading-none">
                close
              </span>
            </button>
          </div>
        )}

        <div
          ref={scrollRef}
          className={`absolute inset-x-0 ${
            warning && !warningDismissed ? "top-[104px]" : "top-16"
          } bottom-16 overflow-y-scroll no-scrollbar snap-y snap-mandatory transition-all duration-300`}
        >
          {isLoading ? (
            <>
              <StorySkeleton />
              <StorySkeleton />
              <StorySkeleton />
            </>
          ) : error ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <span className="material-symbols-outlined text-[48px] text-status-critical mb-3">
                error
              </span>
              <h3 className="font-headline text-[18px] font-bold text-on-surface mb-2">
                Failed to load news
              </h3>
              <p className="font-body text-[14px] text-text-muted mb-6 max-w-[240px]">
                We couldn't connect to the news server. Please check your connection.
              </p>
              <button
                onClick={() => refetch()}
                className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-body text-[14px] font-bold shadow-md shadow-primary/20 active:scale-95 transition-transform"
              >
                Try Again
              </button>
            </div>
          ) : displayStories.length > 0 ? (
            displayStories.map((s) => <StoryCard key={s.id} story={s} />)
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <span className="material-symbols-outlined text-[48px] text-secondary mb-3">
                article
              </span>
              <h3 className="font-headline text-[18px] font-bold text-on-surface mb-2">
                No news articles
              </h3>
              <p className="font-body text-[14px] text-text-muted max-w-[240px]">
                No news stories found at the moment. Try refreshing.
              </p>
            </div>
          )}
        </div>
        
        {displayStories.length > 0 && <SwipeHint visible={hintVisible} />}
        <BottomNav />
      </div>
    </div>
  );
}
