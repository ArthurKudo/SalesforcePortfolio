import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { StackedGalleryCard } from "@/components/ui/stacked-gallery-card";
import { SectionHead } from "@/components/sections/SectionHead";
import { certifications, profile } from "@/data/profile";
import type { Certification } from "@/data/profile";
import { lockScroll } from "@/lib/lenis";
import { useLang } from "@/i18n";

function CertCard({ cert, highlighted = false }: { cert: Certification; highlighted?: boolean }) {
  const { t, tx } = useLang();
  return (
    <div className={`cert${highlighted ? " is-highlighted" : ""}`}>
      <img
        className="cert__badge"
        src={cert.badge}
        alt={`Salesforce Certified ${cert.name} ${t.certifications.badgeAlt}`}
        width={120}
        height={118}
        loading="lazy"
        draggable={false}
      />
      <h3>{cert.name}</h3>
      {cert.earnedAs && (
        <p className="cert__earned">
          {t.certifications.earnedAs} {cert.earnedAs}
        </p>
      )}
      <p className="cert__date">{tx(cert.date)}</p>
    </div>
  );
}

export function Certifications() {
  const { t, tx } = useLang();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  const openGallery = (index: number | null = null) => {
    setFocusIndex(index);
    dialogRef.current?.showModal();
    lockScroll(true);
    if (index !== null) {
      requestAnimationFrame(() => {
        dialogRef.current
          ?.querySelector(`[data-cert-index="${index}"]`)
          ?.scrollIntoView({ block: "center", behavior: "smooth" });
      });
    }
  };

  return (
    <section className="section-block" id="certifications" aria-labelledby="certifications-title">
      <div className="wrap">
        <SectionHead id="certifications-title" index="02" label={t.certifications.label} title={t.certifications.title}>
          {t.certifications.sub}
        </SectionHead>

        <div className="cert-actions reveal">
          <button type="button" className="btn btn--brand" onClick={() => openGallery()}>
            {t.certifications.viewAll}
          </button>
          <a className="btn btn--outline" href={profile.trailblazer} target="_blank" rel="noopener">
            {t.certifications.verify}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <StackedGalleryCard
          className="cert-library reveal border-0 bg-transparent shadow-none rounded-none"
          onSelect={(i) => openGallery(i)}
          items={certifications.map((cert) => ({
            id: cert.name,
            label: `${cert.name}, ${tx(cert.date)}`,
            content: <CertCard cert={cert} />,
          }))}
        />
      </div>

      <dialog
        ref={dialogRef}
        className="modal"
        aria-labelledby="certs-dialog-title"
        data-lenis-prevent
        onClose={() => {
          lockScroll(false);
          setFocusIndex(null);
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="modal__inner">
          <button className="modal__close" type="button" aria-label={t.certifications.close} onClick={() => dialogRef.current?.close()}>
            <X size={20} aria-hidden="true" />
          </button>
          <div className="modal__content">
            <p className="section-head__label">
              <span>02</span>
              {t.certifications.label}
            </p>
            <h2 id="certs-dialog-title">{t.certifications.dialogTitle}</h2>
            <p className="modal__lead">{t.certifications.naming}</p>
            <ul className="certs modal__block">
              {certifications.map((cert, i) => (
                <li key={cert.name} data-cert-index={i}>
                  <CertCard cert={cert} highlighted={focusIndex === i} />
                </li>
              ))}
            </ul>
            <div className="modal__block">
              <a className="btn btn--outline" href={profile.trailblazer} target="_blank" rel="noopener">
                {t.certifications.verify}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
}
