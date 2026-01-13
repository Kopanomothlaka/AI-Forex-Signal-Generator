export interface AnalysisResult {
  asset?: string;
  timeframe?: string;
  currentPrice?: string;
  
  marketBias: 'bullish' | 'bearish' | 'range';
  confidence: 'high' | 'medium' | 'low';
  
  technicalAnalysis: {
    structure: string;
    keyLevels: {
      support: string[];
      resistance: string[];
    };
    indicators: {
      name: string;
      value: string;
      signal: 'bullish' | 'bearish' | 'neutral';
    }[];
    patterns: string[];
  };
  
  tradeScenarios: {
    buy: {
      entry: string;
      stopLoss: string;
      takeProfit: string;
      riskReward: string;
      reasoning: string;
    };
    sell: {
      entry: string;
      stopLoss: string;
      takeProfit: string;
      riskReward: string;
      reasoning: string;
    };
  };
  
  fundamentalAnalysis: {
    summary: string;
    overallBias: 'bullish' | 'bearish' | 'neutral';
    news: {
      title: string;
      impact: 'high' | 'medium' | 'low';
      bias: 'bullish' | 'bearish' | 'neutral';
    }[];
    upcomingEvents: string[];
  };
  
  finalDecision: {
    decision: 'buy' | 'sell' | 'wait';
    summary: string;
    warnings: string[];
    riskGuidance: string;
  };
}
