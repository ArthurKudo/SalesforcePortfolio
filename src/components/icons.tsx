import type { SVGProps } from "react";

const CLOUD_PATH = "M26 4a12 12 0 0 1 20 5 10 10 0 0 1 12 10 10 10 0 0 1-9 10H17A11 11 0 0 1 14 8a12 12 0 0 1 12-4z";

export function CloudIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 44" aria-hidden="true" {...props}>
      <path d={CLOUD_PATH} />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.3 18.3V10H5.7v8.3h2.6zM7 8.8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11.3 9.5v-4.6c0-2.4-1.3-3.6-3.1-3.6-1.4 0-2.1.8-2.4 1.3V10h-2.6v8.3h2.6v-4.4c0-1.2.2-2.3 1.7-2.3 1.4 0 1.4 1.3 1.4 2.4v4.3h2.4z" />
    </svg>
  );
}
