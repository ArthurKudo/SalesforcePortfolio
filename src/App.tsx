import { useEffect } from "react";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { Skills } from "@/components/sections/Skills";
import { Projects, useProjects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Backdrop } from "@/components/sections/Backdrop";
import { useReveal } from "@/hooks/useReveal";
import { initSmoothScroll, scrollToTarget } from "@/lib/lenis";
import { useLang } from "@/i18n";

export default function App() {
  const projects = useProjects();
  const { t, lang } = useLang();
  useReveal([lang]);

  useEffect(() => {
    const cleanup = initSmoothScroll();
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id && !id.startsWith("project-") ? document.getElementById(id) : null;
    if (target) requestAnimationFrame(() => scrollToTarget(target, true));
    return cleanup;
  }, []);

  return (
    <>
      <a className="skip-link" href="#experience">
        {t.skip}
      </a>
      <Backdrop />
      <Header hasProjects={projects.length > 0} />
      <main id="main">
        <Hero />
        <Experience />
        <Certifications />
        {projects.length > 0 ? <Projects projects={projects} /> : null}
        <Skills index={projects.length > 0 ? "04" : "03"} />
        <Contact />
      </main>
    </>
  );
}
