import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Mail, Menu, X } from "lucide-react";
import { CloudIcon } from "@/components/icons";
import { useActiveSection } from "@/hooks/useActiveSection";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n";
import type { Lang } from "@/i18n";

interface HeaderProps {
  hasProjects: boolean;
}

const LANGS: { id: Lang; label: string; name: string }[] = [
  { id: "en", label: "EN", name: "English" },
  { id: "pt", label: "PT", name: "Português" },
];

export function Header({ hasProjects }: HeaderProps) {
  const { lang, setLang, t } = useLang();
  const items = useMemo(
    () =>
      [
        { id: "experience", label: t.nav.experience },
        { id: "certifications", label: t.nav.certifications },
        hasProjects ? { id: "projects", label: t.nav.work } : null,
        { id: "skills", label: t.nav.skills },
        { id: "contact", label: t.nav.contact },
      ].filter((item): item is { id: string; label: string } => item !== null),
    [hasProjects, t]
  );
  const ids = useMemo(() => ["top", ...items.map((item) => item.id)], [items]);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className={`topbar${scrolled ? " is-scrolled" : ""}`}>
      <motion.div className="topbar__progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="topbar__inner">
        <a className="topbar__brand" href="#top" aria-label={`${profile.name}, ${t.backToTop}`}>
          <CloudIcon />
          <span>{profile.name}</span>
        </a>

        <nav className={`topbar__nav${open ? " is-open" : ""}`} aria-label="Sections" id="site-nav">
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="topbar__pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="topbar__label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="topbar__actions">
          <div className="lang-switch" role="group" aria-label={t.langLabel}>
            {LANGS.map((option) => (
              <button
                key={option.id}
                type="button"
                lang={option.id === "pt" ? "pt-BR" : "en"}
                aria-pressed={lang === option.id}
                aria-label={option.name}
                onClick={() => setLang(option.id)}
              >
                {lang === option.id && (
                  <motion.span
                    layoutId="lang-pill"
                    className="lang-switch__pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="lang-switch__label">{option.label}</span>
              </button>
            ))}
          </div>
          <a className="btn btn--brand btn--sm" href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" />
            <span>{t.emailMe}</span>
          </a>
          <button
            type="button"
            className="topbar__toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
