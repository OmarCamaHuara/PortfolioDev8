import "./app.scss"
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero"
import Parallax from "./components/parallax/Parallax";
import Services from "./components/services/Services";
import Portfolio from "./components/portfolio/Porfolio";
import Contact from "./components/contact/Contact";
import ChatBot from "./components/chatBot/Chatbot"
import Cursor from "./components/cursor/Cursor";

const App = () => {
  return <div>
    <Cursor />
    <section id="Homepage">
      <Navbar />
      <Hero />
    </section>

    <section>
      <Parallax type="services" />
    </section>

    <section id="Services">
      <Services />
    </section>

    <section id="Portfolio">
      <Parallax type="portfolio" />
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

export default App;
