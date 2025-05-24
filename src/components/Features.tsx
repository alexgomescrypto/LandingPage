import React from 'react';
import { 
  Bell, 
  TrendingUp, 
  Clock, 
  BarChart3, 
  BookOpen, 
  Users, 
  Shield,
  Zap
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10">
      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Bell className="h-6 w-6 text-blue-400" />,
      title: "Alertas em Tempo Real",
      description: "Receba notificações instantâneas de oportunidades de trading de alta probabilidade em criptomoedas."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-green-400" />,
      title: "Performance Comprovada",
      description: "Retorno de 258% em apenas 4 meses com um histórico verificado por terceiros independentes."
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-400" />,
      title: "Análise que Economiza Tempo",
      description: "Nosso algoritmo analisa milhares de pontos de dados para entregar apenas sinais de alta qualidade."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-yellow-400" />,
      title: "Estatísticas Detalhadas",
      description: "Acompanhe seu desempenho com análises abrangentes e relatórios personalizáveis."
    }    
  ];

  return (
    <section id="features" className="py-20 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Recursos Avançados para <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"> Traders Sérios</span>
          </h2>
          <p className="text-xl text-gray-400">
            Nossa plataforma poderosa de sinais de trading foi projetada para te dar uma vantagem no mercado de criptomoedas volátil.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
