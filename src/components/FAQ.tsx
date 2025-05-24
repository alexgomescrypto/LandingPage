import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg pl-4 font-medium text-white">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="pb-4 pl-4 text-gray-400">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Como recebo os sinais de trading?",
      answer: "Os sinais são entregues por múltiplos canais, incluindo nosso aplicativo móvel, e-mail e grupo privado no Telegram. Você receberá notificações instantâneas com todos os detalhes necessários para executar a operação, incluindo preço de entrada, níveis de take-profit e stop-loss."
    },
    {
      question: "Quantos sinais receberei por dia?",
      answer: "Focamos na qualidade, não na quantidade. Em média, enviamos de 2 a 4 sinais por dia, variando conforme as condições de mercado. Enviamos apenas sinais de alta probabilidade que atendem aos nossos critérios rigorosos."
    },
    {
      question: "Qual é a taxa de acerto dos seus sinais?",
      answer: "Nossos sinais mantêm uma taxa de sucesso de 87% nos últimos 4 meses. Embora o desempenho passado não garanta resultados futuros, aprimoramos continuamente nosso algoritmo para manter alta precisão em diferentes condições de mercado."
    },
    {
      question: "Quais criptomoedas vocês cobrem?",
      answer: "Nos concentramos principalmente em Bitcoin, Ethereum e as 20 principais altcoins por capitalização de mercado. Nossos planos Pro e Elite também incluem oportunidades emergentes em altcoins de médio porte com alto potencial de crescimento."
    },
    {
      question: "Preciso de experiência em trading para usar seus sinais?",
      answer: "Embora algum conhecimento básico de trading seja útil, nossos sinais são acessíveis a traders de todos os níveis. Fornecemos orientações detalhadas com cada sinal e nossos recursos educacionais ajudam iniciantes a começar."
    },
    {
      question: "Existe um valor mínimo para começar?",
      answer: "Não, você pode começar com qualquer valor que se sinta confortável. Nossos sinais funcionam igualmente bem para portfólios pequenos e grandes, embora recomendemos ter capital suficiente para diversificar suas operações."
    },
    {
      question: "Posso cancelar minha assinatura?",
      answer: "Sim, você pode cancelar a assinatura a qualquer momento. Oferecemos garantia de devolução de 7 dias se você não estiver satisfeito com nosso serviço por qualquer motivo."
    },
    {
      question: "Como é calculado o retorno de 258%?",
      answer: "O retorno de 258% é baseado na capitalização de todas as operações durante o período de 4 meses, assumindo uma alocação de 1% do portfólio por operação e seguindo todas as recomendações de entrada, take-profit e stop-loss exatamente como fornecido. Resultados individuais podem variar conforme execução e tamanho das posições."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Perguntas Frequentes <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Respondidas</span>
          </h2>
          <p className="text-xl text-gray-400">
            Tudo que você precisa saber sobre nossos sinais de trading e como eles podem ajudar você a lucrar.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 divide-y divide-gray-700 overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">Ainda tem dúvidas? Estamos aqui para ajudar.</p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-all duration-200"
          >
            Fale com o Suporte
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
