import style from "./chatBot.module.scss";

const ChatBot = () => {
    return <div className={style.chatbot}>
        <h2 className={style['mini-title']}>
            <small>
                Talk to me
            </small>
                ChatBot
        </h2>
        <div className={style['chatbot-blue']}>
            <div className={style['chat-info']}>
                <h2><span>IA</span> ChatBot</h2>
                <p>Eu montei um chatbot aqui que conhece todas as minhas habilidades, experiência de trabalho e tem uma cópia do meu CV/Currículo. Você pode usá-lo para fazer perguntas sobre mim para ter uma ideia melhor de quem eu sou e o que eu fiz</p>
                <p className={style['download-description']}>Você também pode baixar meu currículo aqui se quiser dar uma olhada. Atualmente, estou procurando novas oportunidades, então se você tem um projeto que acha que eu seria uma boa opção, entre em contato!</p>
                <a href="https://drive.google.com/file/d/1Lin57jAzdqDK_PVDrr6jZeK1ltSouJ_G/view?usp=sharing" className={style.button}>Download CV</a>
            </div>
            <div className={style['chat-box']}>
                 <div className={style['scroll-area']}>
                    <ul>
                        <li className={style['bot-message']}>
                            <span className={style['avatar-bot']}>
                                <img src="./chatBot/chatBot.jpg" alt="" />
                            </span>
                            <div className={style.message}>
                                Olá, sou um chatbot amigável que permite que você interaja com este portfólio e CV. Como posso ajudar?
                            </div>
                        </li>
                        <li className={style['user-message']}>
                            <span className={style['avatar-user']}>
                                <img src="./chatBot/user1.png" alt="" />
                            </span>
                            <div className={style.message}>
                            Tenho uma pergunta para lhe fazer sobre este currículo
                            </div>
                        </li>
                    </ul>
                    
                 </div>
                 <div className={style['chat-message']}>
                    <input type="text" placeholder="Olá Elianderson, em quais habilidades você é melhor?" />
                    <button className={style.button}>Enviar</button>
                 </div> 
            </div>
        </div>
    </div>;
};  

export default ChatBot;
