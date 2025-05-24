import React, { useEffect, useRef } from 'react';
import { ArrowRight, Check, TrendingUp } from 'lucide-react';

const Performance: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-draw-full');
            // observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="performance" className="py-20 bg-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Histórico de <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Performance</span>
          </h2>
          <p className="text-xl text-gray-400">
            Nossos sinais de trading superaram consistentemente o mercado, entregando retornos excepcionais para nossos membros.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative" ref={chartRef}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl blur opacity-30"></div>
            <div className="relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Crescimento de Performance</h3>
                <div className="flex items-center space-x-2">
                  {/* <span className="h-3 w-3 bg-green-400 rounded-full"></span>
                  <span className="text-sm text-gray-400">Sinais ProfitCoin</span>
                  <span className="h-3 w-3 bg-gray-500 rounded-full ml-4"></span>
                  <span className="text-sm text-gray-400">Mercado BTC</span>
									<span className="h-3 w-3 bg-blue-500 rounded-full ml-4"></span>
									<span className="text-sm text-gray-400">Ibovespa</span>
									<span className="h-3 w-3 bg-purple-500 rounded-full ml-4"></span>
									<span className="text-sm text-gray-400">CDI</span> */}
                </div>
              </div>
              
              <div className="h-80 relative">
          {/* Gráfico de performance com múltiplas linhas */}
          <svg className="w-full h-full " preserveAspectRatio="none">
            
            {/* Linha ProfitCoin */}
            <path 
              d="M0,300 C100,240 200,170 300,100 C350,60 400,30 400,25" 
              fill="none"
              strokeWidth="3"
              stroke="#22c55e"
              
            />

            {/* Linha BTC */}
            <path 
              d="M0,300 C100,285 200,245 300,200 C350,170 400,150 400,150"
              fill="none"
              strokeWidth="2.5"
              stroke="orange"

            />

            {/* Linha Ibovespa */}
            <path 
               d="M0,300 C100,292 200,275 300,255 C350,240 400,225 400,225"
              fill="none"
              strokeWidth="2.5"
              stroke="blue"

            />

            {/* Linha CDI */}
            <path 
              d="M0,300 C100,298 200,295 300,293 C350,291 400,289 400,289"    
              fill="none"
              strokeWidth="2.5"
              stroke="purple"
              
            />
          </svg>
                
                {/* Marcador de ROI */}
                <div className="absolute top-2 right-4 flex items-center bg-gray-900/60 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-green-500/30">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-sm font-medium text-green-400">+258% ProfitCoin</span>
                </div>
								 <div className="absolute right-2 top-[150px] flex items-center space-x-1 bg-gray-900/60 px-2 py-1 rounded border border-orange-500/30">
						    <TrendingUp className="h-4 w-4 text-orange-400" />
						    <span className="text-xs font-medium text-orange-400">+8.6% BTC</span>
						  </div>
						
						  <div className="absolute right-2 top-[210px] flex items-center space-x-1 bg-gray-900/60 px-2 py-1 rounded border border-blue-500/30">
						    <TrendingUp className="h-4 w-4 text-blue-400" />
						    <span className="text-xs font-medium text-blue-400">+9.3% IBOV</span>
						  </div>
						
						  <div className="absolute right-2 top-[295.12px] flex items-center space-x-1 bg-gray-900/60 px-2 py-1 rounded border border-purple-500/30">
						    <TrendingUp className="h-4 w-4 text-purple-400" />
						    <span className="text-xs font-medium text-purple-400">+4.5% CDI</span>
						  </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mt-6 text-center">
                <div>
                  <p className="h-3 w-3 bg-green-400 rounded-full"></p>
                  <span className="text-sm text-gray-400">ProfitCoin</span>
                </div>
                <div>
                  <p className="h-3 w-3 bg-orange-400 rounded-full ml-4"></p>
                  <span className="text-sm text-gray-400">Bitcoin</span>
                </div>
                <div>
                  <p className="h-3 w-3 bg-blue-500 rounded-full ml-4"></p>
                  <span className="text-sm text-gray-400">Ibovespa</span>
                </div>
                <div>
                  <p className="h-3 w-3 bg-purple-500 rounded-full ml-4"></p>
                  <span className="text-sm text-gray-400">CDI</span> 
                </div>
              </div>
            </div>
          </div>


					
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Por que nossos sinais têm melhor desempenho</h3>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500/20 text-green-500">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">Algoritmo Proprietário</h4>
                  <p className="mt-1 text-gray-400">Nosso IA analisa mais de 50 indicadores técnicos e sinais de sentimento de mercado.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500/20 text-green-500">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">Abordagem Seletiva de Sinais</h4>
                  <p className="mt-1 text-gray-400">Enviamos apenas as configurações de alta probabilidade, em média 3 sinais por dia.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500/20 text-green-500">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">Filtragem por Condições de Mercado</h4>
                  <p className="mt-1 text-gray-400">Os sinais são calibrados às condições atuais do mercado para maximizar a taxa de sucesso.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500/20 text-green-500">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">Verificação por Especialistas</h4>
                  <p className="mt-1 text-gray-400">Cada sinal algorítmico é verificado por traders profissionais antes de ser enviado.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <a 
                href="#pricing" 
                className="inline-flex items-center text-green-400 font-medium hover:text-green-300 transition-colors"
              >
                Veja opções de assinatura <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Total de Sinais</p>
            <p className="text-3xl font-bold text-white">370</p>
            <p className="text-sm text-gray-500 mt-1">Em 4 meses</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Taxa de Acerto</p>
            <p className="text-3xl font-bold text-green-400">71%</p>
            <p className="text-sm text-gray-500 mt-1">Consistentemente alta</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Lucro Médio por Operação</p>
            <p className="text-3xl font-bold text-white">3.2%</p>
            <p className="text-sm text-gray-500 mt-1">Potencial de capitalização</p>
          </div>
          
          
        </div>
      </div>
    </section>
  );
};

export default Performance;
