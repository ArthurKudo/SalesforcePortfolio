import * as React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface StackedGalleryItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface StackedGalleryCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actionLabel?: string;
  items: StackedGalleryItem[];
  onAction?: () => void;
  onSelect?: (index: number) => void;
  itemWidth?: number;
  itemHeight?: number;
  className?: string;
}

const PAD = 28;
const TILT = -34;

export function StackedGalleryCard({
  title,
  subtitle,
  actionLabel = "View gallery",
  items,
  onAction,
  onSelect,
  itemWidth = 168,
  itemHeight = 214,
  className,
}: StackedGalleryCardProps) {
  const stripRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const [hovered, setHovered] = React.useState<number | null>(null);

  React.useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const count = items.length;
  const cardW = Math.min(itemWidth, Math.max(96, width * 0.3));
  const cardH = (cardW / itemWidth) * itemHeight;
  const step = count > 1 ? (width - PAD * 2 - cardW) / (count - 1) : 0;

  const indexAt = (clientX: number) => {
    const el = stripRef.current;
    if (!el || count === 0) return null;
    const x = clientX - el.getBoundingClientRect().left - PAD - cardW / 2;
    return Math.max(0, Math.min(count - 1, Math.round(step ? x / step : 0)));
  };

  const transformFor = (i: number) => {
    const mid = (count - 1) / 2;
    const arc = count > 1 ? 1 - Math.pow((i - mid) / mid, 2) : 1;
    if (hovered === null) {
      const rise = 0.42 - arc * 0.14;
      return `translateY(${rise * 100}%) rotateY(${TILT}deg)`;
    }
    const dist = Math.abs(i - hovered);
    if (dist === 0) return "translateY(4%) rotateY(0deg) scale(1.08)";
    const dip = Math.min(0.62, 0.5 + dist * 0.03);
    const push = i < hovered ? -18 : 18;
    return `translateX(${dist === 1 ? push : push / 2}px) translateY(${dip * 100}%) rotateY(${TILT}deg)`;
  };

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      <div className={cn("relative z-10 flex flex-col items-center gap-3 px-6 text-center", title ? "pt-10" : "pt-0")}>
        {title ? (
          <h3 className="m-0 text-[clamp(26px,3.4vw,38px)] font-bold leading-tight tracking-tight text-foreground">
            {title}
          </h3>
        ) : null}
        {subtitle ? <p className="m-0 max-w-xl text-muted-foreground">{subtitle}</p> : null}
        {onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="mt-1 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-sf-navy px-5 text-sm font-semibold text-white transition hover:bg-sf-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sf-brand"
          >
            {actionLabel}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div
        ref={stripRef}
        className={cn("relative", title ? "mt-6" : "-mt-2")}
        style={{ height: cardH * 0.92, perspective: "1100px" }}
        onPointerMove={(e) => setHovered(indexAt(e.clientX))}
        onPointerLeave={() => setHovered(null)}
      >
        {width > 0 &&
          items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={() => onSelect?.(i)}
              className="absolute top-0 cursor-pointer rounded-xl p-0 text-left outline-none transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] [transform-origin:50%_100%] focus-visible:ring-2 focus-visible:ring-sf-brand"
              style={{
                left: PAD + i * step,
                width: cardW,
                height: cardH,
                transform: transformFor(i),
                zIndex: hovered === i ? 100 : 50 - Math.round(Math.abs(i - (hovered ?? (count - 1) / 2)) * 2),
              }}
            >
              {item.content}
            </button>
          ))}
      </div>
    </div>
  );
}

export default StackedGalleryCard;
