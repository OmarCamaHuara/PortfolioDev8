import "./hero.scss"

const Hero = () => {
    return (
        <div className="hero">
            <div className="wrapper">
                <div className="textContainer">
                    <h2>Omar Cama Huarahuara</h2>
                    <h1>Backend Dev. and Scrum Master</h1>
                    <div className="buttons">
                        <button>See the Lastest Works</button>
                        <button>Contact me</button>
                    </div>
                    <img src="./scroll.png" alt="" />
                </div>
            </div>
            <div className="imageContainer">
                <img src="./DevOmar2.png" alt="" />
            </div>
        </div>
    )
}

export default Hero;