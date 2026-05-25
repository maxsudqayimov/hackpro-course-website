const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.8',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

export function ShieldIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 3 5 6v5c0 4.4 2.9 8.4 7 10 4.1-1.6 7-5.6 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-5" />
    </svg>
  );
}

export function ChipIcon() {
  return (
    <svg {...iconProps}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
      <path d="M10 12h4" />
    </svg>
  );
}

export function AiIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 8a4 4 0 0 1 8 0v8a4 4 0 0 1-8 0V8Z" />
      <path d="M8 12h8M12 4v16M4 10h4M16 10h4M4 14h4M16 14h4" />
    </svg>
  );
}

export function ProjectIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 5h16v14H4z" />
      <path d="M8 9h8M8 13h5M8 17h3" />
    </svg>
  );
}

export function MentorIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="7" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      <path d="m17 4 2-2 2 2" />
    </svg>
  );
}

export function SparkIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 2v5M12 17v5M4.9 4.9l3.5 3.5M15.6 15.6l3.5 3.5M2 12h5M17 12h5M4.9 19.1l3.5-3.5M15.6 8.4l3.5-3.5" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function CertificateIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 4h14v11H5z" />
      <path d="M8 8h8M8 12h5" />
      <path d="m10 15-2 5 4-2 4 2-2-5" />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
    </svg>
  );
}

export function CodeIcon() {
  return (
    <svg {...iconProps}>
      <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 4l-4 16" />
    </svg>
  );
}

export function HomeIcon() {
  return (
    <svg {...iconProps}>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function BookIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 8H20" />
    </svg>
  );
}

export function InfoIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export function CameraIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 7h4l1.5-2h5L16 7h4v12H4z" />
      <circle cx="12" cy="13" r="3.5" />
      <path d="M18 10h.01" />
    </svg>
  );
}

export function BotIcon() {
  return (
    <svg {...iconProps}>
      <rect x="5" y="7" width="14" height="12" rx="3" />
      <path d="M12 7V3" />
      <path d="M8.5 12h.01M15.5 12h.01" />
      <path d="M9 16h6" />
      <path d="M3 13h2M19 13h2" />
    </svg>
  );
}
