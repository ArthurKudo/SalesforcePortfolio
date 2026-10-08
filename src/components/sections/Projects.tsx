import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Maximize2 } from "lucide-react";
import { CaseDrawer } from "@/components/sections/CaseDrawer";
import { SectionHead } from "@/components/sections/SectionHead";
import { projectExamples, projects as baseProjects, showExampleProjects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { useLang } from "@/i18n";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { scrollToTarget } from "@/lib/lenis";

const FALLBACK_COVER =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 400"><rect width="580" height="400" fill="#032d60"/><path fill="#1b96ff" fill-opacity=".5" transform="translate(226 150) scale(2)" d="M26 4a12 12 0 0 1 20 5 10 10 0 0 1 12 10 10 10 0 0 1-9 10H17A11 11 0 0 1 14 8a12 12 0 0 1 12-4z"/></svg>'
  );

const pad = (n: number) => String(n).padStart(2, "0");
const ease = [0.22, 1, 0.36, 1] as const;

function CaseSlide({ project, index, onOpen }: { project: Project; index: number; onOpen: (i: number) => void }) {
  const { t, tx } = useLang();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], reduced ? [1, 1, 1, 1] : [0.86, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], reduced ? [1, 1, 1, 1] : [0.25, 1, 1, 0.35]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [0, 0, 0] : [-4, 0, 3]);
  const peekY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["40%", "-30%"]);
  const peek = project.gallery?.[0]?.src;

  return (
    <article ref={ref} className="case-slide" data-case-index={index}>
      <motion.div className="case-slide__stage" style={{ scale, opacity, rotate }}>
        <button
          type="button"
          className="case-slide__frame"
          onClick={() => onOpen(index)}
          aria-label={`${t.work.open}: ${tx(project.title)}`}
        >
          <img src={project.cover || FALLBACK_COVER} alt="" loading="lazy" />
          <span className="case-slide__hint" aria-hidden="true">
            <Maximize2 />
            {t.work.open}
          </span>
        </button>
        {peek ? (
          <motion.img className="case-slide__peek" src={peek} alt="" loading="lazy" style={{ y: peekY }} aria-hidden="true" />
        ) : null}
      </motion.div>
    </article>
  );
}

interface CasePanelProps {
  projects: Project[];
  active: number;
  onOpen: (i: number) => void;
  onJump: (i: number) => void;
}

function CasePanel({ projects, active, onOpen, onJump }: CasePanelProps) {
  const { t, tx } = useLang();
  const reduced = useReducedMotion();
  const project = projects[active];

  return (
    <aside className="cases__panel">
      <div className="cases__meta">
        <span className="cases__count">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={active}
              initial={reduced ? false : { y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduced ? undefined : { y: "-100%", opacity: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              {pad(active + 1)}
            </motion.span>
          </AnimatePresence>
          <span className="cases__total">/ {pad(projects.length)}</span>
        </span>
        {project.sample ? <span className="modal__sample">{t.work.sample}</span> : null}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={project.id}
          className="cases__copy"
          initial={reduced ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduced ? undefined : { opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease }}
        >
          <p className="cases__cloud">{project.clouds.join(" · ")}</p>
          <h3 className="cases__title">{tx(project.title)}</h3>
          <p className="cases__summary">{tx(project.summary)}</p>
          {!!project.highlights?.length && (
            <ul className="highlights cases__results">
              {project.highlights.slice(0, 2).map((h) => (
                <li key={tx(h)}>{tx(h)}</li>
              ))}
            </ul>
          )}
          {!!project.tags?.length && (
            <ul className="tags">
              {project.tags.slice(0, 4).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>

      <button type="button" className="btn btn--brand cases__open" onClick={() => onOpen(active)}>
        {t.work.open}
        <ArrowRight aria-hidden="true" />
      </button>

      <ol className="cases__index" aria-label={t.work.label}>
        {projects.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              aria-current={i === active ? "true" : undefined}
              aria-label={`${t.work.goTo} ${pad(i + 1)}: ${tx(p.title)}`}
              title={tx(p.title)}
              onClick={() => onJump(i)}
            >
              {i === active && (
                <motion.span layoutId="case-dot" className="cases__index-pill" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
              )}
              <span>{pad(i + 1)}</span>
            </button>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function CaseCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (i: number) => void }) {
  const { t, tx } = useLang();
  return (
    <article className="case-card reveal">
      <button type="button" className="case-card__cover" onClick={() => onOpen(index)} aria-label={`${t.work.open}: ${tx(project.title)}`}>
        <img src={project.cover || FALLBACK_COVER} alt="" loading="lazy" />
      </button>
      <p className="cases__cloud">
        {pad(index + 1)} · {project.clouds.join(" · ")}
      </p>
      <h3 className="cases__title">{tx(project.title)}</h3>
      <p className="cases__summary">{tx(project.summary)}</p>
      {!!project.highlights?.length && (
        <ul className="highlights cases__results">
          {project.highlights.slice(0, 2).map((h) => (
            <li key={tx(h)}>{tx(h)}</li>
          ))}
        </ul>
      )}
      <button type="button" className="btn btn--outline btn--sm" onClick={() => onOpen(index)}>
        {t.work.open}
        <ArrowRight aria-hidden="true" />
      </button>
    </article>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const { t } = useLang();
  const wide = useMediaQuery("(min-width: 1024px)");
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!wide) return;
    const slides = Array.from(stageRef.current?.querySelectorAll<HTMLElement>("[data-case-index]") ?? []);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.caseIndex));
        });
      },
      { rootMargin: "-48% 0px -48% 0px" }
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [wide, projects]);

  useEffect(() => {
    const fromHash = () => {
      const match = window.location.hash.match(/^#project-(.+)$/);
      if (!match) return;
      const index = projects.findIndex((p) => p.id === decodeURIComponent(match[1]));
      if (index >= 0) setOpenIndex(index);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [projects]);

  const setHash = (index: number | null) => {
    const base = `${window.location.pathname}${window.location.search}`;
    history.replaceState(null, "", index === null ? `${base}#projects` : `${base}#project-${projects[index].id}`);
  };

  const slideAt = (index: number) => stageRef.current?.querySelector<HTMLElement>(`[data-case-index="${index}"]`);

  const open = (index: number) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setOpenIndex(index);
    setHash(index);
  };

  const changeIndex = (index: number) => {
    setOpenIndex(index);
    setHash(index);
    if (!wide) return;
    setActive(index);
    const slide = slideAt(index);
    if (slide) scrollToTarget(slide, true);
  };

  const close = () => {
    setOpenIndex(null);
    setHash(null);
    lastFocus.current?.focus();
  };

  const jump = (index: number) => {
    const slide = slideAt(index);
    if (slide) scrollToTarget(slide);
  };

  return (
    <section className="section-block" id="projects" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHead id="projects-title" index="03" label={t.work.label} title={t.work.title}>
          {t.work.sub}
        </SectionHead>

        {wide ? (
          <div className="cases">
            <CasePanel projects={projects} active={active} onOpen={open} onJump={jump} />
            <div className="cases__stage" ref={stageRef}>
              {projects.map((p, i) => (
                <CaseSlide key={p.id} project={p} index={i} onOpen={open} />
              ))}
            </div>
          </div>
        ) : (
          <div className="cases-list">
            {projects.map((p, i) => (
              <CaseCard key={p.id} project={p} index={i} onOpen={open} />
            ))}
          </div>
        )}
      </div>

      <CaseDrawer projects={projects} index={openIndex} onIndexChange={changeIndex} onClose={close} />
    </section>
  );
}

export function useProjects() {
  return useMemo(() => {
    const isDemo = new URLSearchParams(window.location.search).has("demo");
    return showExampleProjects || isDemo ? [...baseProjects, ...projectExamples] : baseProjects;
  }, []);
}
