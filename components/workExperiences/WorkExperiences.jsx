import { useRef } from "react"
import style from "./work-experiences.module.scss"
import { motion, useInView } from "framer-motion"

const variants = {
    initial: {
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
        <motion.div
            className={style['services']}
            variants={variants}
            initial="initial"
            ref={ref}
            animate={isInView ? "animate" : "initial"}
        >
            <motion.div className={style['text-container']} variants={variants}>
                <p>
                    Aprendizado contínuo
                    <br />
                    Impacto constante
                </p>
                <hr />
            </motion.div>
            <motion.div className={style['title-container']} variants={variants}>
                <div className={style['title']}>
                    <img src="/people.webp" alt="" />
                    <h1>
                        <motion.b whileHover={{ color: "orange" }}>
                            Minha
                        </motion.b>{" "}
                        Jornada
                    </h1>
                </div>
                <div className={style['title']}>
                    <h1>
                        <motion.b whileHover={{ color: "orange" }}>
                            Através De
                        </motion.b>{" "}
                        Grandes
                    </h1>
                    <button>OPORTUNIDADES</button>
                </div>
            </motion.div>
            <motion.div className={style['list-container']} variants={variants}>
                <motion.div
                    className={style['box']}
                    whileHover={{ background: "lightgray", color: "black" }}
                >
                    <h2>PHILIPS</h2>
                    <p>
                        Atuei no desenvolvimento de APIs críticas, resolvendo
                        desafios complexos e integrando sistemas legados. Contribuí
                        para projetos que melhoram a vida das pessoas buscando
                        inovar e impactar positivamente o setor médico
                    </p>
                    <button>
                        <a href="https://www.linkedin.com/company/philips/posts/?feedView=all">
                            Go
                        </a>
                    </button>
                </motion.div>
                <motion.div
                    className={style['box']}
                    whileHover={{ background: "lightgray", color: "black" }}
                >
                    <h2>RECODE PRO</h2>
                    <p>
                        Participei na formação de novos desenvolvedores, promovendo
                        um ambiente de aprendizado inclusivo e incentivando a
                        paixão pela tecnologia em todos, ensinando programação e
                        fomentando o trabalho em equipe, alinhado aos meus valores
                        de empatia e colaboração
                    </p>
                    <button>
                        <a href="https://www.linkedin.com/company/rederecode/posts/">
                            Go
                        </a>
                    </button>
                </motion.div>
                <motion.div
                    className={style['box']}
                    whileHover={{ background: "lightgray", color: "black" }}
                >
                    <h2>AGSIM SRL</h2>
                    <p>
                        Me ensinou a importância do aprendizado contínuo,
                        contribuindo para minha versatilidade e adaptabilidade
                        profissional, desenvolvendo habilidades técnicas e
                        compreendendo o valor do trabalho em equipe em um ambiente
                        desafiador e enriquecedor.
                    </p>
                    <button>
                        <a href="https://g.co/kgs/DyHgQZe">Go</a>
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );    
}

export default Services;