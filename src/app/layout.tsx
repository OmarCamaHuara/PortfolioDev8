import type { Metadata } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.scss';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Omar Cama',
    template: '%s — Omar Cama',
  },
  description:
    'AI-fluent backend engineer. Writing about production systems, LLM integration, and the boring engineering that keeps AI honest.',
  authors: [{ name: 'Omar Cama Huarahuara' }],
  openGraph: {
    title: 'Omar Cama',
    description:
      'AI-fluent backend engineer. Writing about production systems, LLM integration, and the boring engineering that keeps AI honest.',
    type: 'website',
    locale: 'pt_BR',
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
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-to-content">
          Ir para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
