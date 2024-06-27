import Test from "./Test";
import "./app.scss"
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero"
import Parallax from "./components/parallax/Parallax";
import Services from "./components/services/Services";

const App = () => {
  return <div>
    <section id="Homepage">
      <Navbar />
      <Hero />
    </section>
    <section id="Services"><Parallax type="services"/></section>
    <section><Services/></section>
    <section id="Portfolio"><Parallax type="portfolio"/></section>
    <section>Portafolio 1</section>
    <section>Portafolio 2</section>
    <section>Portafolio 3</section>
    <section id="Contact">Contact</section>
    {/* <Test/>
    <Test/> */}
  </div>;
};

export default App;
