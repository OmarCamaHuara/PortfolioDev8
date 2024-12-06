import { useRef } from "react";
import "./portfolio.scss"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

const item = [
    {
        id: 1,
        title: "Tech Reviews e DIY: Minhas Aventuras.",
        img: "./projects/DYLL.webp",
        desc: "Compartilhando reviews de produtos, tutoriais de reparos e insights de desenvolvimento, explorando o mundo da tecnologia através de vídeos envolventes.",
    },
    {
        id: 2,
        title: "IA em Foco: As Novidades do Momento",
        img: "./projects/ia.webp",
        desc: "Atualizando sobre as últimas inovações em IA, novos modelos e avanços que estão moldando o futuro tecnológico.",
    },
    {
        id: 3,
        title: "E-commerce na Prática: Minha Jornada",
        img: "./projects/MercadoLibre.webp",
        desc: "Explorando o mundo das vendas online, compartilhando dicas essenciais e desenvolvendo ferramentas com a API do Mercado Livre.",
    },
    {
        id: 4,
        title: "Mãos à Obra com Arduino e Raspberry Pi",
        img: "./projects/Ardu.webp",
        desc: "Iniciando no universo da eletrônica, criando projetos que automatizam casas e exploram novas possibilidades tecnológicas.",
    },
    // {
    //     id: 5,
    //     title: "Social App",
    //     img: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quisquam.",
    // },
]

const Single = ({item}) => {
    const ref = useRef();
    const { scrollYProgress } = useScroll({
        target: ref,
        //offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0,1], [-300, 300]);

    return (
        <section>
            <div className="container">
                <div className="wrapper">
                    <div className="imgContainer" ref={ref}>
                        <img src={item.img} alt="" />
                    </div>
                    <motion.div className="textContainer" style={{ y }}>
                        <h1>{item.title}</h1>
                        <p>{item.desc}</p>
                        <button>Explorar Mais</button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Portfolio = () => {

    const ref = useRef();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"],
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div className="portfolio">
            <div className="progress">
                <h1>Projetos Pessoais</h1>
                <motion.div className="progressBar" style={{ scaleX }}></motion.div>
            </div>
            {item.map((item) => (
                <Single item={item} key={item.id} />
            ))}
        </div>
    )
}
export default Portfolio;