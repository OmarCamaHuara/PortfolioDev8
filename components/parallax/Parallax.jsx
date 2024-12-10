import { useRef } from "react";
import style from "./parallax.module.scss";
import { motion, useScroll, useTransform } from "framer-motion";

const Parallax = ({ type }) => {

    const ref = useRef()

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0,1], ["0%", "500%"]);
    const yBg = useTransform(scrollYProgress, [0,1], ["0%", "100%"]);

    const text = ["What Do You Think?", "What We Did?"];

    return (
        <div
            className={style['parallax']}
            style={{
                background:
                    type === "parallax-context"
                        ? "linear-gradient(180deg, #111132, #0c0c1d)"
                        : "linear-gradient(180deg, #111132, #505064)",
            }}
        >
            <motion.h1 style={{ y: yText }}>
                {type === "parallax-context" ? text[0] : text[1]}
                {console.log(type)}
            </motion.h1>
            <motion.div className={style['mountains']}></motion.div>
            <motion.div
                className={style['planets']}
                style={{
                    y: yBg,
                    backgroundImage: `url(${
                        type === "parallax-context" ? "/planets.png" : "/sun.png"
                    })`,
                }}
            ></motion.div>
            <motion.div style={{ x: yBg }} className={style['stars']}></motion.div>
        </div>
    );    
}

export default Parallax;