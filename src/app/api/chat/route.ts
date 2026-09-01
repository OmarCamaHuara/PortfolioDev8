import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, history, systemPrompt } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const fallbackResponse = getFallbackResponse(message, systemPrompt);
      return NextResponse.json({ response: fallbackResponse });
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-10).map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API error');
    }

    const data = await response.json();
    const assistantResponse = data.choices[0]?.message?.content;

    if (!assistantResponse) {
      throw new Error('No response from OpenAI');
    }

    return NextResponse.json({ response: assistantResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

function getFallbackResponse(message: string, systemPrompt: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('skills') || lowerMessage.includes('habilidades') || lowerMessage.includes('tecnologias')) {
    return `🛠️ **Habilidades Técnicas de Omar:**

**Linguagens:**
- Java (Expert)
- JavaScript (Advanced)
- TypeScript (Advanced)

**Frameworks:**
- Spring Boot (Expert)
- Hibernate (Expert)
- Apache Camel (Advanced)

**Bancos de Dados:**
- SQL Server (Expert)
- PostgreSQL (Advanced)
- MySQL (Advanced)

**Cloud & DevOps:**
- Azure (Advanced)
- Linux (Advanced)
- Git (Expert)

Posso detalhar mais sobre alguma tecnologia específica?`;
  }

  if (lowerMessage.includes('projeto') || lowerMessage.includes('github') || lowerMessage.includes('repo')) {
    return `📁 **Projetos do Omar:**

1. **Tech Reviews & DIY** - Conteúdo sobre reviews e tutoriais no YouTube
2. **IA em Foco** - Pesquisas e estudos sobre Inteligência Artificial
3. **E-commerce** - Integração com API do Mercado Livre
4. **Automação** - Projetos com Arduino e Raspberry Pi

Você pode ver mais no YouTube: @robotex_dev ou entrar em contato para discutir projetos específicos!`;
  }

  if (lowerMessage.includes('experiência') || lowerMessage.includes('trabalho') || lowerMessage.includes('empresa')) {
    return `💼 **Experiência Profissional:**

1. **PHILIPS** - Desenvolvedor Backend
   - APIs críticas para setor médico
   - Integração de sistemas legados

2. **RECODE PRO** - Instrutor de Programação
   - Formação de novos desenvolvedores
   - Ensino de programação e trabalho em equipe

3. **AGSIM SRL** - Desenvolvedor
   - Desenvolvimento fullstack
   - Aprendizado contínuo

Quer saber mais sobre alguma empresa específica?`;
  }

  if (lowerMessage.includes('contato') || lowerMessage.includes('email') || lowerMessage.includes('whatsapp')) {
    return `📬 **Contato:**

- **Email:** omar.js2023@gmail.com
- **WhatsApp:** +55 (11) 98080-8286
- **LinkedIn:** linkedin.com/in/omar-js
- **GitHub:** github.com/omar-cama

Omar está sempre aberto a novas oportunidades!`;
  }

  if (lowerMessage.includes('oi') || lowerMessage.includes('olá') || lowerMessage.includes('ola') || lowerMessage.includes('hi')) {
    return `👋Olá! Sou o assistente virtual do Omar. Posso responder perguntas sobre:

- 💻 Suas habilidades técnicas
- 💼 Experiência profissional
- 📁 Projetos
- 📬 Como entrar em contato

O que gostaria de saber?`;
  }

  return `Obrigado pela pergunta! 🤔

Posso te ajudar com informações sobre:
-💻 Habilidades e tecnologias
-💼 Experiência profissional
-📁 Projetos pessoais
-📬 Contato para oportunidades

Pode me perguntar diretamente sobre qualquer um desses temas!`;
}