import style from "./hero.module.scss"
import React from "react";
import { motion } from "framer-motion"
import ImageSlider from "./sliderMe/ImageSlider";

const textVariants = {
    initial: {
        x: -500,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.1,
        },
    },
    scrollButton: {
        opacity: 0,
        y: 10,
        transition: {
            duration: 2,
            repeat: Infinity,
        }
    },
};

const sliderVariants = {
    initial: {
        x: 0,
    },
    animate: {
        x: "-100%",
        transition: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear"
        },
    },
};

const techIcons = [
    './skills/azure.svg',
    './skills/css.svg',
    './skills/figma.svg',
    './skills/github.svg',
    './skills/hibernate.svg',
    './skills/intellij.svg',
    './skills/java.svg',
    './skills/javascript.svg',
    './skills/linux.svg',
    './skills/microsoft-sql-server.svg',
    './skills/spring-boot.svg',
    './skills/visualSC.svg',
    './skills/sass-1.svg',
    './skills/apacheCamel.svg',
    './skills/Tasy.svg',
    './skills/freemarker.png',
]

const Hero = () => {
    return (
        <div className={style['hero']}>
            <div className={style['wrapper']}>
                <motion.div
                    className={style['text-container']}
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                >
                    <motion.h2 variants={textVariants}>
                        <span className={style['first-name']}>Omar Cama</span>
                        <span className={style['last-name']}>Huarahuara</span>
                    </motion.h2>
                    <motion.h1 variants={textVariants}>
                        Backend Dev. and Autodidata
                    </motion.h1>
                    <motion.p variants={textVariants}>
                        Desenvolvedor Backend apaixonado por criar soluções que
                        impactam a vidas das pessoas, entusiasta de educação, IA e
                        robotica.
                    </motion.p>
                    <motion.div
                        variants={textVariants}
                        className={style['buttons']}
                    >
                        <motion.button variants={textVariants}>
                            <a href="#Services">Experiência de trabalho recente</a>
                        </motion.button>
                        <motion.button variants={textVariants}>
                            <a
                                href="https://drive.google.com/file/d/1Lin57jAzdqDK_PVDrr6jZeK1ltSouJ_G/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Downland CV
                            </a>
                        </motion.button>
                    </motion.div>
                    <motion.img
                        variants={textVariants}
                        animate="scrollButton"
                        src="./scroll.png"
                        alt=""
                    />
                </motion.div>
            </div>
            <motion.div
                className={style['slider-icons-container']}
                variants={sliderVariants}
                initial="initial"
                animate="animate"
            >
                <div className={style['icons-wrapper']}>
                    {[...techIcons, ...techIcons].map((icon, index) => (
                        <img key={index} src={icon} alt={`Icon ${index}`} />
                    ))}
                </div>
            </motion.div>
            <div className={style['image-container']}>
                <ImageSlider />
            </div>
        </div>
    );    
}

export default Hero;