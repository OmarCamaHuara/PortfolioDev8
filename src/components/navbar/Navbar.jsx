import Sidebar from "../sidebar/Sidebar"
import "./navbar.scss"
import {motion} from "framer-motion"

const Navbar = () => {
    const variants = {
        visible: {
            opacity: 0,
            scale: 0.5
        },
        hidden: {
            opacity: 1,
            scale: 1
        },
        transitionLogo: {
            duration: 0.5
        }
    }
    return (
        <div className="navbar">
            {/* Sidebar */}
            <Sidebar/>
            <div className="wrapper">
                <motion.span
                    variants={variants}
                    initial='visible'
                    animate='hidden'
                    transition='transitionLogo'
                >
                    Domar_Dev8
                </motion.span>
                <div className="social">
                    <a href="#"><img src="/facebook.png" alt="" /></a>
                    <a href="#"><img src="/instagram.png" alt="" /></a>
                    <a href="#"><img src="/youtube.png" alt="" /></a>
                    <a href="#"><img src="/dribbble.png" alt="" /></a>
                </div>
            </div>
        </div>
    )
}

export default Navbar