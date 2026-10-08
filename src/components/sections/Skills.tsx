import { useMemo } from "react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import type { TimelineItem } from "@/components/ui/radial-orbital-timeline";
import { SectionHead } from "@/components/sections/SectionHead";
import { skillOrbit, toolbox } from "@/data/profile";
import { useLang } from "@/i18n";

export function Skills({ index }: { index: string }) {
  const { t, tx } = useLang();
  const nodes = useMemo<TimelineItem[]>(
    () =>
      skillOrbit.map((node) => ({
        ...node,
        title: tx(node.title),
        date: tx(node.date),
        category: tx(node.category),
        content: tx(node.content),
      })),
    [tx]
  );

  return (
    <section className="section-block section-block--skills" id="skills" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead id="skills-title" index={index} label={t.skills.label} title={t.skills.title}>
          {t.skills.sub}
        </SectionHead>
      </div>
      <div className="skills__orbit">
        <RadialOrbitalTimeline
          timelineData={nodes}
          statusLabels={t.skills.status}
          energyLabel={t.skills.proficiency}
          relatedLabel={t.skills.worksWith}
          centerImage="assets/skills/salesforce-cloud.svg"
          centerLabel="Salesforce"
          theme="light"
        />
      </div>
      <div className="wrap">
        <ul className="chips reveal" aria-label={t.skills.toolbox}>
          {toolbox.map((item) => (
            <li key={tx(item)}>{tx(item)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
