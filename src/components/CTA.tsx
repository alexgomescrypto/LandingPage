import React, { useState } from 'react';
import { ArrowRight, TrendingUp, Shield, Clock } from 'lucide-react';
import RegisterForm from './RegisterForm';

const CTA: React.FC = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      // Aqui você implementaria a lógica de registro
      console.log('Dados do registro:', data);
      // Simular delay do registro
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Registro realizado com sucesso!');
      setShowRegisterForm(false);
    } catch (error) {
      console.error('Erro no registro:', error);
      alert('Erro ao realizar o registro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="signup" className="py-20 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900 z-0"></div>
      
      {/* Gráficos de moedas animados */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-green-500"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animation: `float ${Math.random() * 15 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.2,
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/40 to-green-900/40 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-blue-700/50 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comece a Lucrar com Criptomoedas <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Hoje</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Junte-se a milhares de traders de sucesso que usam nossos sinais para obter lucros consistentes no mercado de criptomoedas.
            </p>
          </div>
          
          {showRegisterForm ? (
            <div className="max-w-md mx-auto">
              <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-xl border border-gray-700">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Retorno de 258%</h3>
                  <p className="text-gray-400">Desempenho comprovado nos últimos 4 meses com resultados verificáveis.</p>
                </div>
                
                <div className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-xl border border-gray-700">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <Shield className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Gestão de Risco</h3>
                  <p className="text-gray-400">Cada sinal inclui níveis precisos de entrada, take-profit e stop-loss.</p>
                </div>
                
                <div className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-xl border border-gray-700">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <Clock className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Alertas Instantâneos</h3>
                  <p className="text-gray-400">Nunca perca uma oportunidade com nosso sistema de notificações multi-canal.</p>
                </div>
              </div>
              
              <div className="text-center space-y-6">
                <p className="text-gray-300">
                  <span className="font-semibold">Oferta por Tempo Limitado:</span> Ganhe 30% de desconto no seu primeiro mês com o código <span className="font-mono bg-gray-800 text-green-400 px-2 py-1 rounded">PROFIT30</span>
                </p>
                
                <button 
                  onClick={() => setShowRegisterForm(true)}
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-green-500/20 transition-all duration-200"
                >
                  Comece seu Teste de 7 Dias <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                
                <p className="text-sm text-gray-400">
                  Garantia de devolução de 7 dias. Sem necessidade de cartão de crédito para o teste.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;