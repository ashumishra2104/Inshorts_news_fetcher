interface TopBarProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function TopBar({ onRefresh, isRefreshing }: TopBarProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur border-b border-surface-variant flex items-center justify-between px-5 h-16">
      <button className="active:scale-95 transition-transform" aria-label="Menu">
        <span className="material-symbols-outlined text-primary">menu</span>
      </button>
      <h1 className="font-headline text-[22px] font-black tracking-tighter text-primary uppercase">
        NEWSVALA
      </h1>
      <button
        onClick={onRefresh}
        className={`active:scale-95 transition-transform flex items-center justify-center w-8 h-8 ${
          isRefreshing ? "animate-spin" : ""
        }`}
        aria-label="Refresh"
        disabled={isRefreshing}
      >
        <span className="material-symbols-outlined text-primary text-[24px]">
          refresh
        </span>
      </button>
    </header>
  );
}
