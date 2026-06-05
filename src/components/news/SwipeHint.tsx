export function SwipeHint({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none animate-bounce transition-opacity duration-500"
      style={{ opacity: visible ? 0.5 : 0 }}
    >
      <span className="material-symbols-outlined text-secondary">
        keyboard_double_arrow_up
      </span>
      <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
        Swipe Up
      </p>
    </div>
  );
}
