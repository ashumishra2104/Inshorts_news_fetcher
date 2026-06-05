import { useNavigate } from "@tanstack/react-router";

export function WelcomeScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    try {
      localStorage.setItem("newsvala:welcomed", "1");
    } catch {
      // ignore storage failures
    }
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-dvh bg-neutral-900 flex justify-center">
      <div className="relative w-full max-w-[480px] h-dvh bg-surface overflow-hidden shadow-2xl flex flex-col px-6 pt-16 pb-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-[28px] bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="10" y="14" width="36" height="5" rx="2.5" fill="white" />
              <rect x="10" y="25.5" width="28" height="5" rx="2.5" fill="white" />
              <rect x="10" y="37" width="36" height="5" rx="2.5" fill="white" />
              <circle cx="40" cy="39.5" r="4.5" fill="white" />
              <circle cx="40" cy="39.5" r="2" fill="#bc000a" />
            </svg>
          </div>

          <h1 className="mt-7 font-headline text-[28px] font-black tracking-tight uppercase text-on-surface">
            NEWSVALA
          </h1>
          <p className="mt-3 font-body text-[16px] leading-6 text-text-muted max-w-[280px]">
            Your daily news, condensed and curated.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {["FAST", "RELIABLE", "BITE-SIZED"].map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface font-body text-[12px] font-bold tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col items-center gap-5">
          <button
            onClick={handleStart}
            className="w-full h-14 rounded-2xl bg-primary text-on-primary font-headline text-[18px] font-bold tracking-tight active:scale-[0.98] transition-transform shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
          >
            Let's read
            <span className="material-symbols-outlined text-[22px]">
              arrow_forward
            </span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-6 h-1.5 rounded-full bg-primary" />
            <span className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
            <span className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
          </div>
        </div>
      </div>
    </div>
  );
}
