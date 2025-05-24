import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  rating: number;
  profit: string;
  avatar: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, title, rating, profit, avatar }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 relative">
      <div className="absolute -top-4 -right-4 bg-blue-900/50 backdrop-blur-sm p-2 rounded-full border border-blue-700">
        <Quote className="h-5 w-5 text-blue-400" />
      </div>
      
      <div className="flex items-center mb-4">
        <img 
          src={avatar} 
          alt={name} 
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="text-white font-medium">{name}</h4>
          <p className="text-gray-400 text-sm">{title}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
          />
        ))}
      </div>
      
      <p className="text-gray-300 mb-4">{quote}</p>
      
      <div className="border-t border-gray-700 pt-4 mt-4">
        <p className="text-sm text-gray-400">
          Lucro: <span className="text-green-400 font-medium">{profit}</span>
        </p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Os sinais ProfitCoin transformaram completamente meu trading de criptomoedas. Estava cético no começo, mas após ver ganhos consistentes, agora sou um verdadeiro crente.",
      name: "Michel R.",
      title: "Trader em Tempo Integral",
      rating: 5,
      profit: "+1412% em 4 meses",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      quote: "O que mais me impressionou foi a abordagem de qualidade ao invés de quantidade. Esses sinais não são aleatórios - cada um vem com análise detalhada e pontos de entrada/saída claros.",
      name: "Sara L.",
      title: "Técnica de Enfermagem",
      rating: 5,
      profit: "+786% em 3 meses",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      quote: "Já tentei vários serviços de sinais antes, mas nenhum chega perto da precisão do ProfitCoin. A abordagem de gerenciamento de risco ajudou a crescer meu portfólio de forma constante.",
      name: "Pedro S.",
      title: "Empresario",
      rating: 4,
      profit: "+475% em 4 meses",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      quote: "Como iniciante, eu perdia dinheiro constantemente antes de encontrar o ProfitCoin. Os recursos educacionais junto com os sinais foram essenciais para meu desenvolvimento.",
      name: "Jessica T.",
      title: "Vendedora",
      rating: 5,
      profit: "+645% em 2 meses",
      avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Confiado por <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">varios implementsbros</span>
          </h2>
          <p className="text-xl text-gray-400">
            Não acredite só na nossa palavra. Veja o que nossos membros dizem sobre sua experiência com ProfitCoin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              rating={testimonial.rating}
              profit={testimonial.profit}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#signup" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
          >
            Junte-se aos Traders de Sucesso
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
