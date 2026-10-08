import { GraduationCap } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { SectionHead } from "@/components/sections/SectionHead";
import { education, experiences } from "@/data/profile";
import { useLang } from "@/i18n";

export function Experience() {
  const { t, tx } = useLang();

  const data = experiences.map((xp) => ({
    title: (
      <div className="xp-title">
        <span className="xp-title__span">{tx(xp.span)}</span>
        <h3 className="xp-title__company">{tx(xp.company)}</h3>
        <span className="xp-title__meta">{tx(xp.meta)}</span>
        {xp.current ? <span className="xp-title__now">{t.experience.current}</span> : null}
      </div>
    ),
    content: (
      <div className="xp-roles">
        {xp.roles.map((role) => (
          <article className="xp-role reveal" key={tx(role.title)}>
            <div className="xp-role__head">
              <h4>{tx(role.title)}</h4>
              <span>{tx(role.period)}</span>
            </div>
            <ul>
              {role.bullets.map((bullet) => (
                <li key={tx(bullet)}>{tx(bullet)}</li>
              ))}
            </ul>
          </article>
        ))}
        <ul className="xp-stack reveal" aria-label="Stack">
          {xp.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section className="section-block" id="experience" aria-labelledby="experience-title">
      <div className="wrap">
        <SectionHead id="experience-title" index="01" label={t.experience.label} title={t.experience.title}>
          {t.experience.sub}
        </SectionHead>
        <Timeline data={data} />
        <p className="xp-edu reveal">
          <GraduationCap aria-hidden="true" />
          <span>
            <strong>{tx(education.degree)}</strong> · {education.school} · {education.period}
          </span>
        </p>
      </div>
    </section>
  );
}
