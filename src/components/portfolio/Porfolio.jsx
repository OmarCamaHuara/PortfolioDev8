import { useRef } from "react";
import "./portfolio.scss"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

const item = [
    {
        id: 1,
        title: "React Commerce",
        img: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quisquam.",
    },
    {
        id: 2,
        title: "Next.js Commerce Delivery",
        img: "https://images.pexels.com/photos/10619092/pexels-photo-10619092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quisquam.",
    },
    {
        id: 3,
        title: "Vanilla JS App",
        img: "https://images.pexels.com/photos/11161261/pexels-photo-11161261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quisquam.",
    },
    {
        id: 4,
        title: "Music App",
        img: "https://images.pexels.com/photos/13003485/pexels-photo-13003485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quisquam.",
    },
    {
        id: 5,
        title: "Social App",
        img: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quisquam.",
    },
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
                        <button>Read More</button>
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
                <h1>Featured Works</h1>
                <motion.div className="progressBar" style={{ scaleX }}></motion.div>
            </div>
            {item.map((item) => (
                <Single item={item} key={item.id} />
            ))}
        </div>
    )
}
export default Portfolio;