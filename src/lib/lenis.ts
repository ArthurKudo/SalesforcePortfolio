import Lenis from "lenis";

export const HEADER_OFFSET = 88;

let instance: Lenis | null = null;

export function getLenis() {
  return instance;
}

export function scrollToTarget(target: HTMLElement, immediate = false) {
  if (instance) {
    instance.scrollTo(target, { offset: -HEADER_OFFSET, immediate, force: immediate });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
  }
}

export function lockScroll(locked: boolean) {
  document.body.style.overflow = locked ? "hidden" : "";
  if (locked) instance?.stop();
  else instance?.start();
}

export function initSmoothScroll() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced) {
    instance = new Lenis({ autoRaf: true, lerp: 0.09, wheelMultiplier: 0.95 });
  }

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
    const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = decodeURIComponent(link.hash.slice(1));
    const target = id ? document.getElementById(id) : document.body;
    if (!target) return;
    event.preventDefault();
    scrollToTarget(target);
    history.pushState(null, "", id ? `#${id}` : window.location.pathname + window.location.search);
  };
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    instance?.destroy();
    instance = null;
  };
}
