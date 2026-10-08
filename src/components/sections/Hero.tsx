import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDownRight, MapPin, Mail } from "lucide-react";
import { BlurText } from "@/components/ui/blur-text";
import { CloudIcon, LinkedInIcon } from "@/components/icons";
import { certifications, highlights, profile } from "@/data/profile";
import { useLang } from "@/i18n";
import profilePhoto from "@/assets/profile.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t, tx } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);
  const photoRotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -3]);

  const fadeUp = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 18, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, ease, delay },
  });

  return (
    <section className="hero" id="top" ref={ref} aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <motion.p className="hero__status" {...fadeUp(0)}>
            <span className="hero__status-item">
              <span className="hero__dot" aria-hidden="true" />
              {tx(profile.availability)}
            </span>
            <span className="hero__sep" aria-hidden="true" />
            <span className="hero__status-item">{tx(profile.workModel)}</span>
            <span className="hero__sep" aria-hidden="true" />
            <span className="hero__status-item">
              <MapPin aria-hidden="true" />
              {tx(profile.location)}
            </span>
          </motion.p>

          <h1 id="hero-title" className="hero__title">
            <BlurText text={profile.name} delay={0.1} stagger={0.12} />
          </h1>
          <motion.p className="hero__role" {...fadeUp(0.35)}>
            {tx(profile.role)}
          </motion.p>
          <motion.p className="hero__summary" {...fadeUp(0.45)}>
            {tx(profile.summary)}
          </motion.p>

          <motion.dl className="hero__facts" {...fadeUp(0.55)}>
            {highlights.map((item) => (
              <div key={tx(item.label)}>
                <dt>{tx(item.label)}</dt>
                <dd>{tx(item.value)}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div className="hero__actions" {...fadeUp(0.65)}>
            <a className="btn btn--brand" href={`mailto:${profile.email}`}>
              <Mail aria-hidden="true" />
              {t.hero.cta}
            </a>
            <a className="btn btn--outline" href="#experience">
              {t.hero.experience}
              <ArrowDownRight aria-hidden="true" />
            </a>
            <a className="btn btn--icon" href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a className="btn btn--icon" href={profile.trailblazer} target="_blank" rel="noopener" aria-label="Trailblazer">
              <CloudIcon />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={reduced ? false : { opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          <motion.div className="hero__photo" style={{ y: photoY, rotate: photoRotate }}>
            <img src={profilePhoto} alt={`${t.hero.portrait} ${profile.name}`} width={640} height={641} />
          </motion.div>
          <a className="hero__badges" href="#certifications" aria-label={t.hero.certifiedAria}>
            <span className="hero__badge-stack" aria-hidden="true">
              {certifications.slice(0, 5).map((cert) => (
                <img key={cert.name} src={cert.badge} alt="" width={44} height={43} />
              ))}
            </span>
            <span>
              <strong>{t.hero.certified}</strong>
              {t.hero.certifiedSub}
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
