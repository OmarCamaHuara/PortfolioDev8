import "./chatBot.scss";

const ChatBot = () => {
    return <div className="chatbot">
        <h2 className="mini-title">
            <small>
                Talk to me
            </small>
                ChatBot
        </h2>
        <div className="chatbot-blue">
            <div className="chat-info">
                <h2>IA ChatBot</h2>
                <p>Eu montei um chatbot aqui que conhece todas as minhas habilidades, experiência de trabalho e tem uma cópia do meu CV/Currículo. Você pode usá-lo para fazer perguntas sobre mim para ter uma ideia melhor de quem eu sou e o que eu fiz</p>
                <p>Você também pode baixar meu currículo aqui se quiser dar uma olhada. Atualmente, estou procurando novas oportunidades, então se você tem um projeto que acha que eu seria uma boa opção, entre em contato!</p>
                <a href="https://drive.google.com/file/d/10rAcIJM_kj40kf8HZBRsTNEk506kKtMX/view?usp=sharing" className="button">Download CV</a>
            </div>
            <div className="chat-box">
                 <div className="scroll-area">
                    <ul>
                        <li className="bot-message">
                            <span className="avatar bot">
                                <img src="./chatBot/chatBot.jpg" alt="" />
                            </span>
                            <div className="message">
                                Olá, sou um chatbot amigável que permite que você interaja com este portfólio e CV. Como posso ajudar?
                            </div>
                        </li>
                        <li className="user-message">
                            <span className="avatar user">
                                <img src="./chatBot/user1.png" alt="" />
                            </span>
                            <div className="message">
                            Tenho uma pergunta para lhe fazer sobre este currículo
                            </div>
                        </li>
                    </ul>
                    
                 </div>
                 <div className="chat-message">
                    <input type="text" placeholder="Olá Elianderson, em quais habilidades você é melhor?" />
                    <button className="button">Enviar</button>
                 </div> 
            </div>
        </div>
    </div>;
};  

export default ChatBot;