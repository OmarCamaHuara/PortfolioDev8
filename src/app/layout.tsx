import type { Metadata } from 'next';
import { Instrument_Serif, Inter, Roboto_Mono } from 'next/font/google';
import './globals.scss';

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

import { SITE_URL } from '@/lib/site';
import { BRANDING } from '@/lib/branding';

export const metadata: Metadata = {
  title: {
    default: BRANDING.title,
    template: `%s · ${BRANDING.name}`,
  },
  description: BRANDING.description,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: BRANDING.name,
    title: BRANDING.title,
    description: BRANDING.shortDescription,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: BRANDING.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: BRANDING.title,
    description: BRANDING.shortDescription,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: BRANDING.fullName,
  url: SITE_URL,
  jobTitle: BRANDING.tagline.replace(/\.$/, ''),
  worksFor: { '@type': 'Organization', name: 'Premiersoft' },
  sameAs: [
    'https://github.com/OmarCamaHuara',
    'https://linkedin.com/in/omar-cama-huarahuara',
    'https://youtube.com/@QuERSERSEnior',
  ],
  knowsAbout: [
    'Java',
    'Spring Boot',
    'Hexagonal Architecture',
    'PostgreSQL',
    'Oracle PL/SQL',
    'Large Language Models',
    'Retrieval-Augmented Generation',
    'Model Context Protocol',
    'Docker',
    'Kubernetes',
    'Backend Engineering',
    'AI Engineering',
  ],
  seeks: {
    '@type': 'JobPosting',
    title: 'AI Engineer / LLM Engineer / AI-adjacent Backend',
    employmentType: ['FULL_TIME', 'CONTRACTOR'],
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Brazil' },
      { '@type': 'Place', name: 'European Union' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-to-content">
          Pular para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}

