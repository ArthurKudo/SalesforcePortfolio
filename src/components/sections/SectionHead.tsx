import type { ReactNode } from "react";
import { BlurText } from "@/components/ui/blur-text";

interface SectionHeadProps {
  id: string;
  index: string;
  label: string;
  title: string;
  children?: ReactNode;
  light?: boolean;
}

export function SectionHead({ id, index, label, title, children, light }: SectionHeadProps) {
  return (
    <header className={`section-head${light ? " section-head--light" : ""}`}>
      <p className="section-head__label reveal">
        <span>{index}</span>
        {label}
      </p>
      <BlurText as="h2" id={id} text={title} inView className="section-head__title" />
      {children ? <div className="section-head__sub reveal">{children}</div> : null}
    </header>
  );
}
