import { useRef } from "react"
import "./services.scss"
import { motion, useInView } from "framer-motion"

const variants = {
    initial: {
        x: -500,
        y: 100,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            staggerChildren: 0.1,
        },
    },
}

const Services = () => {

    const ref = useRef()
    const isInView = useInView(ref, {margin:"-100px"});

    return (
        <motion.div className="services" 
                    variants={variants} 
                    initial="initial" 
                    //animate="animate"
                    //whileInView="animate"
                    ref={ref}
                    animate={isInView && "animate"}
        >
            <motion.div className="textContainer" variants={variants}>
                <p>Aprendizado contínuo
                    <br />Impacto constante
                </p>
                <hr />
            </motion.div>
            <motion.div className="titleContainer" variants={variants}>
                <div className="title">
                    <img src="/people.webp" alt="" />
                    <h1><motion.b whileHover={{color:"orange"}}>Minha</motion.b> Jornada</h1>
                </div>
                <div className="title">
                    <h1><motion.b whileHover={{color:"orange"}}>Através De</motion.b> Grandes</h1>
                    <button>OPORTUNIDADES</button>
                </div>
            </motion.div>
            <motion.div className="listContainer" variants={variants}>
                <motion.div className="box" whileHover={{ background: "lightgray", color: "black"}}>
                    <h2>PHILIPS</h2>
                    <p>Atuei no desenvolvimento de APIs críticas, resolvendo desafios complexos e integrando sistemas legados. Contribuí para projetos que melhoram a vida das pessoas buscando inovar e impactar positivamente o setor médico</p>
                    <button><a href="https://www.linkedin.com/company/philips/posts/?feedView=all">Go</a></button>
                </motion.div>
                <motion.div className="box" whileHover={{ background: "lightgray", color: "black"}}>
                    <h2>RECODE PRO</h2>
                    <p>Participei na formação de novos desenvolvedores, promovendo um ambiente de aprendizado inclusivo e incentivando a paixão pela tecnologia em todos, ensinando programação e fomentando o trabalho em equipe, alinhado aos meus valores de empatia e colaboração</p>
                    <button><a href="https://www.linkedin.com/company/rederecode/posts/">Go</a></button>
                </motion.div>
                <motion.div className="box" whileHover={{ background: "lightgray", color: "black"}}>
                    <h2>AGSIM SRL</h2>
                    <p>Me ensinou a importância do aprendizado contínuo, contribuindo para minha versatilidade e adaptabilidade profissional, desenvolvendo habilidades técnicas e compreendendo o valor do trabalho em equipe em um ambiente desafiador e enriquecedor.</p>
                    <button><a href="https://g.co/kgs/DyHgQZe">Go</a></button>
                </motion.div>
                {/* <motion.div className="box" whileHover={{ background: "lightgray", color: "black"}}>
                    <h2>Branding</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt, distinctio nam, non quod esse est illo autem odio accusantium facilis commodi itaque iusto tempore ducimus modi cum a maxime praesentium?</p>
                    <button>Go</button>
                </motion.div> */}
            </motion.div>
        </motion.div>
    );
}

export default Services;