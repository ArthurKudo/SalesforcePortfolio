import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Project, ProjectMedia, ProjectSlides } from "@/data/projects";
import { lockScroll } from "@/lib/lenis";
import { useLang } from "@/i18n";

function toEmbedUrl(video: ProjectMedia) {
  const { src, type } = video;
  if (type === "youtube") {
    const match = src.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : src;
  }
  if (type === "loom") return src.replace("/share/", "/embed/");
  if (type === "vimeo") {
    const match = src.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : src;
  }
  return src;
}

function toSlidesUrl(slides: ProjectSlides) {
  if (slides.type === "google") return slides.src.replace(/\/(edit|pub|present)(\?.*)?$/, "/embed$2");
  return slides.src;
}

const pad = (n: number) => String(n).padStart(2, "0");

interface CaseDrawerProps {
  projects: Project[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export function CaseDrawer({ projects, index, onIndexChange, onClose }: CaseDrawerProps) {
  const { t, tx } = useLang();
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState<string | null>(null);
  const project = index === null ? null : projects[index];
  const total = projects.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      lockScroll(true);
    } else if (!project && dialog.open) {
      dialog.close();
    }
  }, [project]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
    setZoomed(null);
  }, [index]);

  const go = (step: number) => {
    if (index === null) return;
    onIndexChange((index + step + total) % total);
  };

  const handleKey = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const title = project ? tx(project.title) : "";
  const prevProject = index === null ? null : projects[(index - 1 + total) % total];
  const nextProject = index === null ? null : projects[(index + 1) % total];

  return (
    <dialog
      ref={dialogRef}
      className="drawer"
      aria-labelledby="drawer-title"
      data-lenis-prevent
      onKeyDown={handleKey}
      onClose={() => {
        lockScroll(false);
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      {project && index !== null && (
        <div className="drawer__panel">
          <header className="drawer__bar">
            <span className="drawer__count">
              {pad(index + 1)}
              <span> / {pad(total)}</span>
            </span>
            <div className="drawer__controls">
              <button type="button" className="drawer__icon" aria-label={t.work.prev} onClick={() => go(-1)}>
                <ArrowLeft aria-hidden="true" />
              </button>
              <button type="button" className="drawer__icon" aria-label={t.work.next} onClick={() => go(1)}>
                <ArrowRight aria-hidden="true" />
              </button>
              <button type="button" className="drawer__icon drawer__icon--close" aria-label={t.work.close} onClick={() => dialogRef.current?.close()}>
                <X aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="drawer__body" ref={bodyRef}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={project.id}
                className="drawer__content"
                initial={reduced ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="section-head__label">
                  {project.clouds.join(" · ")}
                  {project.sample ? <span className="modal__sample">{t.work.sample}</span> : null}
                </p>
                <h2 id="drawer-title">{title}</h2>
                <p className="modal__lead">{tx(project.summary)}</p>

                {project.cover && <img className="modal__cover" src={project.cover} alt={`${title} — ${t.work.screenshot}`} />}

                {!!project.facts?.length && (
                  <dl className="modal__facts">
                    {project.facts.map((fact) => (
                      <div key={tx(fact.label)}>
                        <dt>{tx(fact.label)}</dt>
                        <dd>{tx(fact.value)}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {project.video?.src && (
                  <div className="modal__block">
                    <h3>{t.work.video}</h3>
                    <div className="embed">
                      {project.video.type === "file" ? (
                        <video src={project.video.src} controls preload="metadata" playsInline />
                      ) : (
                        <iframe
                          src={toEmbedUrl(project.video)}
                          title={`${title} — ${t.work.video}`}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                          allowFullScreen
                        />
                      )}
                    </div>
                  </div>
                )}

                {(project.challenge || project.solution) && (
                  <div className="modal__block modal__split">
                    {project.challenge && (
                      <div>
                        <h3>{t.work.challenge}</h3>
                        <p>{tx(project.challenge)}</p>
                      </div>
                    )}
                    {project.solution && (
                      <div>
                        <h3>{t.work.solution}</h3>
                        <p>{tx(project.solution)}</p>
                      </div>
                    )}
                  </div>
                )}

                {!!project.highlights?.length && (
                  <div className="modal__block">
                    <h3>{t.work.results}</h3>
                    <ul className="highlights">
                      {project.highlights.map((h) => (
                        <li key={tx(h)}>{tx(h)}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {!!project.gallery?.length && (
                  <div className="modal__block">
                    <h3>{t.work.mockups}</h3>
                    <div className="gallery">
                      {project.gallery.map((g) => {
                        const caption = g.caption ? tx(g.caption) : t.work.screenshot;
                        const isZoomed = zoomed === g.src;
                        return (
                          <figure key={g.src} className={isZoomed ? "is-zoomed" : undefined}>
                            <button type="button" aria-pressed={isZoomed} onClick={() => setZoomed(isZoomed ? null : g.src)}>
                              <img src={g.src} alt={caption} loading="lazy" />
                            </button>
                            {g.caption && <figcaption>{caption}</figcaption>}
                          </figure>
                        );
                      })}
                    </div>
                  </div>
                )}

                {project.slides?.src && (
                  <div className="modal__block">
                    <h3>{t.work.slides}</h3>
                    <div className="embed">
                      <iframe src={toSlidesUrl(project.slides)} title={`${title} — ${t.work.slides}`} loading="lazy" allowFullScreen />
                    </div>
                  </div>
                )}

                {!!project.tags?.length && (
                  <div className="modal__block">
                    <h3>{t.work.stack}</h3>
                    <ul className="tags">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {!!project.links?.length && (
                  <div className="modal__block modal__links">
                    {project.links.map((l) => (
                      <a key={l.url} className="btn btn--outline btn--sm" href={l.url} target="_blank" rel="noopener">
                        {tx(l.label)}
                      </a>
                    ))}
                  </div>
                )}
              </motion.article>
            </AnimatePresence>

            {total > 1 && prevProject && nextProject && (
              <nav className="drawer__pager" aria-label={t.work.label}>
                <button type="button" onClick={() => go(-1)}>
                  <span>
                    <ArrowLeft aria-hidden="true" />
                    {t.work.prev}
                  </span>
                  <strong>{tx(prevProject.title)}</strong>
                </button>
                <button type="button" onClick={() => go(1)}>
                  <span>
                    {t.work.next}
                    <ArrowRight aria-hidden="true" />
                  </span>
                  <strong>{tx(nextProject.title)}</strong>
                </button>
              </nav>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
