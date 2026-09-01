import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Omar Cama | Backend Developer & AI Enthusiast',
  description: 'Desenvolvedor Backend com experiência em Java, Spring Boot, APIs, microservices e integração de IA. São Paulo, Brasil.',
  keywords: ['Backend Developer', 'Java', 'Spring Boot', 'API', 'Microservices', 'AI', 'Developer', 'São Paulo'],
  authors: [{ name: 'Omar Cama Huarahuara' }],
  openGraph: {
    title: 'Omar Cama | Backend Developer & AI Enthusiast',
    description: 'Desenvolvedor Backend com experiência em Java, Spring Boot, APIs e integração de IA.',
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
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}