import "./hero.scss"
import React, { useState } from "react";
import { animate, motion } from "framer-motion"
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
        <div className="hero">
            <div className="wrapper">
                <motion.div className="textContainer" 
                            variants={textVariants}
                            initial="initial"
                            animate="animate">
                    <motion.h2 variants={textVariants}>
                        <span className="first-name">Omar Cama</span> 
                        <span className="last-name">Huarahuara</span></motion.h2>
                    <motion.h1 variants={textVariants}>Backend Dev. and Autodidata</motion.h1>
                    <motion.p variants={textVariants}>Desenvolvedor Backend apaixonado por criar soluções que impactam a vidas das pessoas, entusiasta de educação, IA e robotica.</motion.p>
                    <motion.div variants={textVariants} className="buttons">
                        <motion.button variants={textVariants}><a href="#Services">Experiência de trabalho recente</a></motion.button>
                        <motion.button variants={textVariants}>
                            <a href="https://drive.google.com/file/d/10rAcIJM_kj40kf8HZBRsTNEk506kKtMX/view?usp=sharing" target="_blank" rel="noopener noreferrer">Downland CV</a>
                            </motion.button>
                    </motion.div>
                    <motion.img variants={textVariants} animate="scrollButton" src="./scroll.png" alt="" />
                </motion.div>
            </div>
            <motion.div className="sliderIconsContainer" 
                        variants={sliderVariants} 
                        initial="initial" 
                        animate="animate">
                <div className="iconsWrapper">
                    {[...techIcons, ...techIcons].map((icon, index) => (
                        <img key={index} src={icon} alt={`Icon ${index}`} />   
                    ))}
                </div>
            </motion.div>
            <div className="imageContainer">
                <ImageSlider/>
            </div>
        </div>
    )
}

export default Hero;