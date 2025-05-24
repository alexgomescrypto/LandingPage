import { useSignalStore } from '../stores/signalStore';
import { useAuthStore } from '../stores/authStore';

let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

// Initialize WebSocket connection
export function initWebSocket() {
  // Close existing connection if any
  if (socket) {
    socket.close();
  }
  
  // In a real app, this would point to your actual WebSocket server
  const wsEndpoint = 'wss://echo.websocket.org';
  
  try {
    socket = new WebSocket(wsEndpoint);
    
    socket.onopen = () => {
      console.log('WebSocket connected');
      
      // Send authentication message
      const user = useAuthStore.getState().user;
      if (user) {
        socket.send(JSON.stringify({
          type: 'auth',
          userId: user.id,
          subscriptionTier: user.subscriptionTier,
        }));
      }
      
      // Clear any reconnect timer
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    };
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Handle different message types
        if (data.type === 'signal') {
          processSignal(data.signal);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };
    
    socket.onclose = () => {
      console.log('WebSocket disconnected');
      
      // Attempt to reconnect after a delay
      if (!reconnectTimer) {
        reconnectTimer = setTimeout(() => {
          reconnectTimer = null;
          initWebSocket();
        }, 5000);
      }
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      socket?.close();
    };
    
  } catch (error) {
    console.error('Failed to establish WebSocket connection:', error);
  }
}

// Process incoming signal data
function processSignal(signalData: any) {
  // Example signal data formats from TradingView:
  // New signal: { msg: "SINAL ARB", signal: "BUY, ALVO:0.3045,STOPLOSS:0.2845", price: 0.2972, symbol: "ARBUSDT" }
  // Close signal: { msg: "SINAL ARB", signal: "CLOSE", price: 0.3568, symbol: "ARBUSDT" }
  
  const { msg, signal, price, symbol } = signalData;
  
  if (signal === 'CLOSE') {
    // Handle signal closure
    useSignalStore.getState().closeSignal(symbol, price);
    return;
  }
  
  // Parse signal details (BUY/SELL, target, stop loss)
  const [action, targetStopLoss] = signal.split(',');
  
  if (!action || !targetStopLoss) {
    console.error('Invalid signal format:', signal);
    return;
  }
  
  // Extract target price
  const targetMatch = targetStopLoss.match(/ALVO:([0-9.]+)/);
  const targetPrice = targetMatch ? parseFloat(targetMatch[1]) : 0;
  
  // Extract stop loss price
  const stopLossMatch = targetStopLoss.match(/STOPLOSS:([0-9.]+)/);
  const stopLossPrice = stopLossMatch ? parseFloat(stopLossMatch[1]) : 0;
  
  // Create signal object
  const newSignal = {
    id: `signal_${Date.now()}`,
    symbol,
    action: action as 'BUY' | 'SELL',
    entryPrice: price,
    targetPrice,
    stopLossPrice,
    entryTime: new Date().toISOString(),
    closeTime: null,
    closePrice: null,
  };
  
  // Add to store
  useSignalStore.getState().addSignal(newSignal);
}

// Send a message through the WebSocket
export function sendWebSocketMessage(message: any) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket not connected');
  }
}

// Close WebSocket connection
export function closeWebSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
  
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
}
