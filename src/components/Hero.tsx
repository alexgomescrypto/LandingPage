import React, { useEffect, useRef } from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Hero: React.FC = () => {
  const counterRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number) => {
      if (counterRef.current) {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const current = Math.floor(progress * (end - start) + start);
          if (counterRef.current) {
            counterRef.current.textContent = `${current}%`;
          }
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateValue(0, 258, 2000);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 flex items-center">
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-gray-900 z-0"></div>
      
      {/* Partículas animadas */}
      <div className="absolute inset-0 z-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-5 pt-24 md:pt-0" >
        <div className="grid md:grid-cols-2 gap-8 items-center mt-20">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700">
              <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-sm font-medium text-green-400">Sinais de Criptomoedas que Funcionam</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold tracking-tight">
              <span className="block text-white">Transforme a Volatilidade do Mercado de Criptomoedas</span>
              <span className="block mt-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Em Lucros Consistentes</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-xl">
              Acesse sinais premium com resultados comprovados. Nosso algoritmo gerou 
              <span ref={counterRef} className="font-bold text-green-400 mx-1">258%</span> 
              de retorno em apenas 4 meses com 370 sinais cuidadosamente selecionados.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#signup" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 shadow-lg hover:shadow-green-500/20 transition-all duration-200"
              >
                Comece a Operar Agora
              </a>
              <a 
                href="#performance" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-300 bg-gray-800/50 hover:bg-gray-800 transition-all duration-200"
              >
                Veja o Desempenho
              </a>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Taxa de Sucesso</span>
                  <span className="flex items-center text-green-400 text-sm"><ArrowUpRight className="h-3 w-3 mr-1" /> Alta</span>
                </div>
                <p className="text-2xl font-bold text-white">67%</p>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Lucro Médio</span>
                  <span className="flex items-center text-green-400 text-sm"><ArrowUpRight className="h-3 w-3 mr-1" /> Por Operação</span>
                </div>
                <p className="text-2xl font-bold text-white">2.2%</p>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Perda Média</span>
                  <span className="flex items-center text-red-400 text-sm"><ArrowDownRight className="h-3 w-3 mr-1" /> Limitada</span>
                </div>
                <p className="text-2xl font-bold text-white">0.8%</p>
              </div>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl blur opacity-30"></div>
            <div className="relative bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
              <div className="h-80 relative">
                {/* Gráfico de negociação fictício */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <path 
                      d="M0,150 C50,120 100,180 150,120 C200,60 250,80 300,40 C350,0 400,30 400,30 L400,200 L0,200 Z" 
                      fill="url(#gradient)" 
                      strokeWidth="2"
                      stroke="#22c55e"
                      className="animate-draw"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Pontos de sinal com imagens de criptomoedas */}
                <img
                  src="https://iili.io/3ZL900P.md.png"
                  alt="Bitcoin"
                  className="absolute top-[75%] left-[25%] h-8 w-8"
                  style={{ transform: 'translate(-50%, -50%)' }}
                />
                <img
                  src="https://iili.io/3ZsyvNj.md.png"
                  alt="Ethereum"
                  className="absolute top-[50%] left-[45%] h-8 w-8"
                  style={{ transform: 'translate(-50%, -50%)' }}
                />
                <img
                  src="https://iili.io/3ZLHswJ.md.png"
                  alt="Ripple"
                  className="absolute top-[30%] left-[75%] h-8 w-8"
                  style={{ transform: 'translate(-50%, -50%)' }}
                />

															
                {/* Rótulo de crescimento */}
                <div className="absolute top-1 right-4 bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-gray-700">
                  <span className="text-sm font-medium text-green-400"> Crescimento +258% </span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-gray-400 text-xs">Total de Sinais</p>
                  <p className="text-white font-bold">370</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs">Período</p>
                  <p className="text-white font-bold">4 Meses</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs">Relação Win/Loss</p>
                  <p className="text-white font-bold">2:1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
