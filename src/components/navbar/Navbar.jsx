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
            <Sidebar/>
            <div className="wrapper">
                <motion.span
                    variants={variants}
                    initial='visible'
                    animate='hidden'
                    transition='transitionLogo'
                >
                    RobotexDev
                </motion.span>
                <div className="social">
                    <a href="https://www.facebook.com/omar.js.8"><img src="/socialMedia/facebook-3-2.svg" alt="" /></a>
                    <a href="https://www.instagram.com/domar.js/"><img src="/socialMedia/instagram-2016-6.svg" alt="" /></a>
                    <a href="https://www.youtube.com/@robotex_dev"><img src="/socialMedia/youtube-icon-5.svg" alt="" /></a>
                    <a href="https://www.linkedin.com/in/omar-js/"><img src="/socialMedia/linkedin-icon-2.svg" alt="" /></a>
                    <a href="https://wa.me/5511980808286"><img src="/socialMedia/whatsapp-3.svg" alt="" /></a>
                </div>
            </div>
        </div>
    )
}

export default Navbar