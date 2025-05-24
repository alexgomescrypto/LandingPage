import React from 'react';
import { Check, X } from 'lucide-react';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlanProps {
  name: string;
  description: string;
  features: PlanFeature[];
  isPopular?: boolean;
  normalPrice: string;
  installmentPrice: string;
  totalPrice: string;
}

const PricingPlan: React.FC<PricingPlanProps> = ({ 
  name, 
  description, 
  features, 
  isPopular = false,
  normalPrice,
  installmentPrice,
  totalPrice
}) => {
  return (
    <div className={`relative bg-gray-800/60 backdrop-blur-sm rounded-xl border ${
      isPopular ? 'border-green-500' : 'border-gray-700'
    } overflow-hidden`}>
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-center py-1">
          <span className="text-xs font-medium uppercase tracking-wide text-white">Mais Popular</span>
        </div>
      )}
      
      <div className="p-6 pt-8 flex flex-col items-center">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        {/* Prices section */}
        <div className="mb-4 w-full text-center">
          {/* Preço normal: menor, apagado, riscado */}
          <div className="text-gray-400 text-sm line-through mb-1">{normalPrice}</div>
          {/* Preço do meio: maior, destacado */}
          <div className="text-3xl font-bold text-white mb-2">{installmentPrice}</div>
          {/* Preço de baixo: menor */}
          <div className="text-xl font-semibold text-gray-300">{totalPrice}</div>
        </div>
        <ul className="space-y-3 mb-8 w-full px-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                feature.included ? 'bg-green-500/20 text-green-500' : 'bg-gray-700/50 text-gray-500'
              }`}>
                {feature.included ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              </div>
              <span className={`ml-3 text-sm ${feature.included ? 'text-gray-300' : 'text-gray-500'}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        <a 
          href="#signup" 
          className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            isPopular 
              ? 'bg-gradient-to-r from-green-500 to-green-400 text-white hover:from-green-600 hover:to-green-500 shadow-lg hover:shadow-green-500/20' 
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          Teste 7 dias
        </a>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Mensal",

      features: [
        { text: "12 meses de assinatura", included: true },
        { text: "Plataforma de Sinais", included: true },
        { text: "Grupo fechado", included: true },
				{ text: "Alertas de Preço", included: true },
				{ text: "Suporte Premium", included: true },
				{ text: "Cursos Cripto", included: true },
      ],
      isPopular: false,
      normalPrice: "R$497",
      installmentPrice: "R$97",
      totalPrice: "à vista"
    },
    {
      name: "Anual",

      features: [
        { text: "12 meses de assinatura", included: true },
        { text: "Plataforma de Sinais", included: true },
        { text: "Grupo fechado", included: true },
				{ text: "Alertas de Preço", included: true },
				{ text: "Suporte Premium", included: true },
				{ text: "Cursos Cripto", included: true },
      ],
      isPopular: false,
      normalPrice: "R$4997",
      installmentPrice: "12x R$73.06",
      totalPrice: "R$797 à vista"
    },
    {
      name: "Semestral",

      features: [
        { text: "12 meses de assinatura", included: true },
        { text: "Plataforma de Sinais", included: true },
        { text: "Grupo fechado", included: true },
				{ text: "Alertas de Preço", included: true },
				{ text: "Suporte Premium", included: true },
				{ text: "Cursos Cripto", included: true },
      ],
      isPopular: true,
      normalPrice: "R$2697",
      installmentPrice: "6X R$87.45",
      totalPrice: "R$477 à vista"
    }
  ];

  const orderedPlans = plans.sort((a, b) => {
    const order = { "Mensal": 1, "Anual": 2, "Semestral": 3 };
    return order[a.name] - order[b.name];
  });

  return (
    <section id="pricing" className="py-20 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Preço</span>
          </h2>
          <p className="text-xl text-gray-400">
            Escolha o plano que melhor se adapta ao seu perfil de trading. Todos com garantia de devolução de 7 dias.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {orderedPlans.map((plan, index) => (
            <PricingPlan
              key={index}
              name={plan.name}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              normalPrice={plan.normalPrice}
              installmentPrice={plan.installmentPrice}
              totalPrice={plan.totalPrice}
            />
          ))}
        </div>
        
        <div className="mt-16 bg-blue-900/20 backdrop-blur-sm border border-blue-800/50 rounded-xl p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2">Soluções Personalizadas</h3>
          <p className="text-gray-400 mb-4">
            Precisa de uma solução sob medida para seu fundo ou grupo de trading? Oferecemos pacotes exclusivos para clientes institucionais.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition-colors"
          >
            Entre em contato para detalhes
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
