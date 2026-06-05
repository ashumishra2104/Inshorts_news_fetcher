import { useState } from "react";

const items = [
  { key: "feed", label: "Feed", icon: "style", filled: true },
  { key: "discover", label: "Discover", icon: "explore", filled: false },
  { key: "profile", label: "Profile", icon: "person", filled: false },
];

export function BottomNav() {
  const [active, setActive] = useState("feed");
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 bg-surface border-t border-surface-variant flex justify-around items-stretch h-16 px-4">
      {items.map((it) => {
        const isActive = active === it.key;
        return (
          <button
            key={it.key}
            onClick={() => setActive(it.key)}
            className={`flex flex-col items-center justify-center flex-1 gap-0.5 pt-1 border-t-2 transition-colors active:scale-95 ${
              isActive
                ? "text-primary border-primary"
                : "text-secondary border-transparent"
            }`}
          >
            <span
              className={`material-symbols-outlined ${isActive ? "filled" : ""}`}
            >
              {it.icon}
            </span>
            <span className="font-body text-[11px] font-bold tracking-wider uppercase">
              {it.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
