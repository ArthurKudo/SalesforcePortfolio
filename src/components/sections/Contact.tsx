import { ArrowUpRight, Mail } from "lucide-react";
import { BlurText } from "@/components/ui/blur-text";
import { CloudIcon, LinkedInIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n";

export function Contact() {
  const { t, tx } = useLang();
  return (
    <section className="section-block contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact__inner">
        <p className="section-head__label reveal">
          <span>{"→"}</span>
          {t.contact.label}
        </p>
        <BlurText as="h2" id="contact-title" inView className="contact__title" text={t.contact.title} />
        <p className="contact__lead reveal">{t.contact.lead}</p>
        <a className="contact__email reveal" href={`mailto:${profile.email}`}>
          <Mail aria-hidden="true" />
          {profile.email}
          <ArrowUpRight aria-hidden="true" />
        </a>
        <div className="contact__links reveal">
          <a className="btn btn--outline" href={profile.linkedin} target="_blank" rel="noopener">
            <LinkedInIcon />
            LinkedIn
          </a>
          <a className="btn btn--outline" href={profile.trailblazer} target="_blank" rel="noopener">
            <CloudIcon />
            Trailblazer
          </a>
        </div>
      </div>
      <footer className="footer wrap">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>{tx(profile.location)}</span>
        <a href="#top">↑ {t.backToTop}</a>
      </footer>
    </section>
  );
}
