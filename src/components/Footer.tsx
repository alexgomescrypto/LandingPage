import React from 'react';
import { TrendingUp, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-8 w-8 text-green-400" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                ProfitCoin
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Sinais de criptomoedas premium com resultados comprovados. Retorno de 258% em apenas 4 meses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Recursos</a></li>
              <li><a href="#performance" className="text-gray-400 hover:text-white transition-colors">Performance</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Depoimentos</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Preços</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">Perguntas Frequentes</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Base de Conhecimento</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Academia de Trading</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Análise de Mercado</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentação API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Fale Conosco</h3>
            <ul className="space-y-4">
              <li className="flex">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <a href="mailto:support@profitcoin.com" className="text-gray-400 hover:text-white transition-colors">
                  support@profitcoin.com
                </a>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <a href="tel:+11234567890" className="text-gray-400 hover:text-white transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400">
                  123 Trading Street, Crypto City
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ProfitCoin. Todos os direitos reservados.
          </p>
          
          <div className="flex flex-wrap justify-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Política de Privacidade</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Termos de Serviço</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Política de Cookies</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Disclaimer</a>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 text-xs">
            A negociação de criptomoedas envolve riscos significativos e pode levar à perda de capital. O desempenho passado não garante resultados futuros. 
            Os sinais do ProfitCoin são apenas para fins informativos e não devem ser considerados aconselhamento financeiro.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
