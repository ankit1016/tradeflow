// Mock API for trading application

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Broker data with meaningful icons
export const brokers = [
  {
    id: 1,
    name: "Interactive Brokers",
    description: "Professional trading platform with global market access",
    logo: "📊",
    features: ["Global Markets", "Low Fees", "Advanced Tools"]
  },
  {
    id: 2,
    name: "TD Ameritrade",
    description: "Comprehensive trading platform with research tools",
    logo: "🎯",
    features: ["ThinkOrSwim", "Research", "Education"]
  },
  {
    id: 3,
    name: "E*TRADE",
    description: "User-friendly platform for active traders",
    logo: "⚡",
    features: ["Options Trading", "Mobile App", "Research"]
  },
  {
    id: 4,
    name: "Charles Schwab",
    description: "Full-service brokerage with comprehensive tools",
    logo: "🏦",
    features: ["StreetSmart Edge", "Research", "Advisory"]
  },
  {
    id: 5,
    name: "Fidelity",
    description: "Leading investment platform with powerful tools",
    logo: "🔒",
    features: ["Active Trader Pro", "Research", "Retirement"]
  },
  {
    id: 6,
    name: "Robinhood",
    description: "Commission-free trading for everyone",
    logo: "🚀",
    features: ["Commission Free", "Mobile First", "Options"]
  }
];

// Mock login function
export const loginUser = async (brokerId, credentials) => {
  // Simulate API delay
  await delay(1000);

  // Test credentials for different scenarios
  if (credentials.username === 'demo' && credentials.password === 'demo123') {
    return {
      status: 200,
      data: {
        id: 1,
        name: 'Demo User',
        email: 'demo@example.com',
        brokerId: brokerId
      }
    };
  } else if (credentials.username === 'error400' && credentials.password === 'test400') {
    return {
      status: 400,
      error: 'Invalid credentials. Please check your username and password.'
    };
  } else if (credentials.username === 'error500' && credentials.password === 'test500') {
    return {
      status: 500,
      error: 'Server error. Please try again later.'
    };
  } else if (credentials.username === 'network' && credentials.password === 'testnet') {
    return {
      status: 500,
      error: 'Network connection failed. Please check your internet connection.'
    };
  } else if (credentials.username === '' || credentials.password === '') {
    return {
      status: 400,
      error: 'Username and password are required.'
    };
  } else {
    return {
      status: 400,
      error: 'Invalid credentials. Please check your username and password.'
    };
  }
};

// Mock API for holdings data
export const getHoldings = async () => {
  await delay(800);
  
  return {
    status: 200,
    data: [
      {
        id: 1,
        symbol: 'AAPL',
        name: 'Apple Inc.',
        quantity: 100,
        avgPrice: 150.25,
        currentPrice: 175.50,
        marketValue: 17550.00,
        pnl: 2525.00,
        pnlPercent: 16.8,
        weekHigh52: 182.50,
        weekLow52: 124.00,
        volume: 45000000,
        marketCap: 2750000000000,
        sector: 'Technology'
      },
      {
        id: 2,
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        quantity: 50,
        avgPrice: 280.00,
        currentPrice: 320.75,
        marketValue: 16037.50,
        pnl: 2037.50,
        pnlPercent: 14.6,
        weekHigh52: 338.00,
        weekLow52: 213.00,
        volume: 22000000,
        marketCap: 2380000000000,
        sector: 'Technology'
      },
      {
        id: 3,
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        quantity: 25,
        avgPrice: 2500.00,
        currentPrice: 2750.25,
        marketValue: 68756.25,
        pnl: 6256.25,
        pnlPercent: 10.0,
        weekHigh52: 2850.00,
        weekLow52: 2200.00,
        volume: 1800000,
        marketCap: 1730000000000,
        sector: 'Technology'
      },
      {
        id: 4,
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        quantity: 75,
        avgPrice: 200.00,
        currentPrice: 180.50,
        marketValue: 13537.50,
        pnl: -1462.50,
        pnlPercent: -9.8,
        weekHigh52: 265.00,
        weekLow52: 152.00,
        volume: 85000000,
        marketCap: 575000000000,
        sector: 'Automotive'
      },
      {
        id: 5,
        symbol: 'AMZN',
        name: 'Amazon.com, Inc.',
        quantity: 30,
        avgPrice: 3200.00,
        currentPrice: 3400.75,
        marketValue: 102022.50,
        pnl: 6022.50,
        pnlPercent: 6.3,
        weekHigh52: 3550.00,
        weekLow52: 2800.00,
        volume: 3500000,
        marketCap: 1760000000000,
        sector: 'Consumer Discretionary'
      },
      {
        id: 6,
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        quantity: 40,
        avgPrice: 400.00,
        currentPrice: 485.25,
        marketValue: 19410.00,
        pnl: 3410.00,
        pnlPercent: 21.3,
        weekHigh52: 505.00,
        weekLow52: 310.00,
        volume: 45000000,
        marketCap: 1190000000000,
        sector: 'Technology'
      },
      {
        id: 7,
        symbol: 'JPM',
        name: 'JPMorgan Chase & Co.',
        quantity: 60,
        avgPrice: 140.00,
        currentPrice: 165.75,
        marketValue: 9945.00,
        pnl: 1545.00,
        pnlPercent: 18.4,
        weekHigh52: 172.00,
        weekLow52: 120.00,
        volume: 8500000,
        marketCap: 475000000000,
        sector: 'Financial Services'
      },
      {
        id: 8,
        symbol: 'JNJ',
        name: 'Johnson & Johnson',
        quantity: 45,
        avgPrice: 160.00,
        currentPrice: 155.25,
        marketValue: 6986.25,
        pnl: -213.75,
        pnlPercent: -3.0,
        weekHigh52: 175.00,
        weekLow52: 145.00,
        volume: 6500000,
        marketCap: 375000000000,
        sector: 'Healthcare'
      }
    ]
  };
};

// Mock API for orderbook data
export const getOrderbook = async () => {
  await delay(600);
  
  return {
    status: 200,
    data: {
      pnl: {
        realized: 12500.00,
        unrealized: 8500.00,
        total: 21000.00
      },
      orders: [
        {
          id: 1,
          symbol: 'AAPL',
          name: 'Apple Inc.',
          type: 'BUY',
          quantity: 50,
          price: 175.50,
          orderValue: 8775.00,
          status: 'COMPLETED',
          timestamp: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          type: 'SELL',
          quantity: 25,
          price: 320.75,
          orderValue: 8018.75,
          status: 'PENDING',
          timestamp: '2024-01-16T14:20:00Z'
        },
        {
          id: 3,
          symbol: 'GOOGL',
          name: 'Alphabet Inc.',
          type: 'BUY',
          quantity: 10,
          price: 2750.25,
          orderValue: 27502.50,
          status: 'COMPLETED',
          timestamp: '2024-01-14T09:15:00Z'
        }
      ]
    }
  };
};

// Mock API for positions data
export const getPositions = async () => {
  await delay(700);
  
  return {
    status: 200,
    data: {
      positions: [
        {
          id: 1,
          symbol: 'AAPL',
          name: 'Apple Inc.',
          type: 'LONG',
          quantity: 100,
          avgPrice: 150.25,
          currentPrice: 175.50,
          marketValue: 17550.00,
          pnl: 2525.00,
          pnlPercent: 16.8
        },
        {
          id: 2,
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          type: 'LONG',
          quantity: 50,
          avgPrice: 280.00,
          currentPrice: 320.75,
          marketValue: 16037.50,
          pnl: 2037.50,
          pnlPercent: 14.6
        },
        {
          id: 3,
          symbol: 'TSLA',
          name: 'Tesla, Inc.',
          type: 'SHORT',
          quantity: 25,
          avgPrice: 220.00,
          currentPrice: 180.50,
          marketValue: 4512.50,
          pnl: 987.50,
          pnlPercent: 28.0
        }
      ]
    }
  };
};

// Mock API for stock data
export const getStockData = (symbol) => {
  const stockData = {
    'AAPL': {
      name: 'Apple Inc.',
      currentPrice: 175.50,
      change: 2.34,
      changePercent: 1.35
    },
    'MSFT': {
      name: 'Microsoft Corporation',
      currentPrice: 320.75,
      change: -1.25,
      changePercent: -0.39
    },
    'GOOGL': {
      name: 'Alphabet Inc.',
      currentPrice: 2750.25,
      change: 45.75,
      changePercent: 1.69
    },
    'TSLA': {
      name: 'Tesla, Inc.',
      currentPrice: 180.50,
      change: -5.25,
      changePercent: -2.83
    },
    'AMZN': {
      name: 'Amazon.com, Inc.',
      currentPrice: 3400.75,
      change: 12.50,
      changePercent: 0.37
    },
    'NVDA': {
      name: 'NVIDIA Corporation',
      currentPrice: 950.00,
      change: 10.00,
      changePercent: 1.06
    },
    'JPM': {
      name: 'JPMorgan Chase & Co.',
      currentPrice: 165.75,
      change: 1.25,
      changePercent: 0.76
    },
    'JNJ': {
      name: 'Johnson & Johnson',
      currentPrice: 155.25,
      change: -0.75,
      changePercent: -0.48
    }
  };
  
  return stockData[symbol] || {
    name: 'Unknown Stock',
    currentPrice: 0,
    change: 0,
    changePercent: 0
  };
};

// Mock API for placing orders
export const placeOrder = async (orderData) => {
  await delay(1000);
  
  return {
    status: 200,
    data: {
      id: Math.floor(Math.random() * 1000),
      ...orderData,
      status: 'PENDING',
      timestamp: new Date().toISOString()
    }
  };
}; 