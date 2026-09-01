'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero/Hero';
import TechStack from '@/components/TechStack/TechStack';
import Experience from '@/components/Experience/Experience';
import Projects from '@/components/Projects/Projects';
import Contact from '@/components/Contact/Contact';

const ChatBot = dynamic(() => import('@/components/ChatBot/ChatBot'), {
  ssr: false,
  loading: () => null,
});

const Navbar = dynamic(() => import('@/components/Navbar/Navbar'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TechStack />
      <Experience />
      <Projects />
      <Contact />
      <ChatBot />
    </main>
  );
}