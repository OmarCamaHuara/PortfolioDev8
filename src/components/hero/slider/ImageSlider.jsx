import "./ImageSlider.scss"
import React, { useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    './opa.png',
    './pensa.png',
    './reseva.png',
    './voce.png'
]

const ImageSlider = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((current) => (current + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);    
    }, []);

    const imageVariants = {
        enter: { opacity: 0, x: 100 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
    };

    return (
        <div className="imageSlider">
            <AnimatePresence mode='wait'>
                <motion.img
                    key={images[currentImage]}
                    src={images[currentImage]}
                    alt="image"
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "tween", stiffness: 5, damping: 1 },
                        opacity: { duration: 0.005 },
                    }}
                    custom={currentImage}            
                />
            </AnimatePresence>   
        </div> 
    )
};

export default ImageSlider;