import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

export function Performance() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      
      // Dados fictícios de valorização do BTC entre fevereiro e março
      const btcData = [
        { date: '2024-02-01', value: 40000 },
        { date: '2024-02-15', value: 42000 },
        { date: '2024-02-29', value: 45000 },
        { date: '2024-03-15', value: 47000 },
        { date: '2024-03-31', value: 48000 },
      ];

      // Rentabilidade hipotética se investido em BTC
      const btcStartValue = btcData[0].value;
      const btcEndValue = btcData[btcData.length - 1].value;
      const btcProfitPercent = ((btcEndValue - btcStartValue) / btcStartValue) * 100;

      // Rentabilidade dos sinais (exemplo fictício)
      const signalsProfitPercent = 35; // Supondo 35% de rentabilidade dos sinais

      // Rentabilidade dos sinais ProfitCoin (exemplo fictício)
      const profitCoinProfitPercent = 50; // Supondo 50% de rentabilidade

      const option = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Valorização BTC', 'Rentabilidade Sinais', 'Rentabilidade ProfitCoin'],
        },
        xAxis: {
          type: 'category',
          data: btcData.map(d => d.date),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Valorização BTC',
            type: 'line',
            data: btcData.map(d => d.value),
            smooth: true,
            lineStyle: {
              color: '#3b82f6', // azul
            },
            areaStyle: {
              color: 'rgba(59, 130, 246, 0.2)',
            },
          },
          {
            name: 'Rentabilidade Sinais',
            type: 'line',
            data: btcData.map(() => {
              // Linha constante representando a rentabilidade dos sinais
              return (btcStartValue * (1 + signalsProfitPercent / 100));
            }),
            smooth: true,
            lineStyle: {
              color: '#10b981', // verde
              type: 'dashed',
            },
            areaStyle: {
              color: 'rgba(16,185,129,0.2)',
            },
          },
          {
            name: 'Rentabilidade ProfitCoin',
            type: 'line',
            data: btcData.map(() => {
              // Linha constante representando a rentabilidade do ProfitCoin
              return (btcStartValue * (1 + profitCoinProfitPercent / 100));
            }),
            smooth: true,
            lineStyle: {
              color: '#f59e0b', // laranja
              type: 'dotted',
            },
            areaStyle: {
              color: 'rgba(245, 158, 11, 0.2)',
            },
          },
        ],
      };

      chartInstance.setOption(option);

      // Exibir a rentabilidade final do BTC
      const rentabilidade = ((btcEndValue - btcStartValue) / btcStartValue) * 100;
      console.log(`Rentabilidade do BTC de fevereiro a março: ${rentabilidade.toFixed(2)}%`);
    }
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-white">Valorização do BTC e Rentabilidade dos Sinais</h3>
      <div ref={chartRef} className="h-64 md:h-96" />
    </div>
  );
}
