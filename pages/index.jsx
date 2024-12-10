import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero"
import Parallax from "../components/parallax/Parallax";
import WorkExperiences from "../components/workExperiences/WorkExperiences";
import Portfolio from "../components/portfolio/Porfolio";
import Contact from "../components/contact/Contact";
import ChatBot from "../components/chatBot/Chatbot"
import Cursor from "../components/cursor/Cursor";

const Home = () => {
  return <div>
    <Cursor />
    <section id="Homepage">
      <Navbar />
      <Hero />
    </section>

    <section id="Parallax">
      <Parallax type='parallax-context'/>
    </section>

    <section id="WorkExperiences">
      <WorkExperiences />
    </section>

    <section id="Parallax">
      <Parallax type='parallax'/>
    </section>
    
    <Portfolio />   

    <section>
      <ChatBot />
    </section>

    <section id="contact">
      <Contact />
    </section>
  </div>;
};

export default Home;
