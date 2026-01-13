import { useState } from 'react';
import { Header } from '@/components/Header';
import { ChartUpload } from '@/components/ChartUpload';
import { MarketBias } from '@/components/MarketBias';
import { TradeScenario } from '@/components/TradeScenario';
import { TechnicalAnalysis } from '@/components/TechnicalAnalysis';
import { FundamentalAnalysis } from '@/components/FundamentalAnalysis';
import { FinalDecision } from '@/components/FinalDecision';
import { AnalysisPlaceholder } from '@/components/AnalysisPlaceholder';
import type { AnalysisResult } from '@/types/analysis';
import { AlertTriangle } from 'lucide-react';

// Mock analysis for demonstration - will be replaced with AI
const mockAnalysis: AnalysisResult = {
  asset: 'XAUUSD',
  timeframe: '1H',
  currentPrice: '2,347.50',
  marketBias: 'bullish',
  confidence: 'high',
  technicalAnalysis: {
    structure: 'Price is making higher highs and higher lows, indicating a clear uptrend. Currently testing a key resistance zone with strong momentum.',
    keyLevels: {
      support: ['2,340.00', '2,325.00', '2,310.00'],
      resistance: ['2,355.00', '2,370.00', '2,385.00'],
    },
    indicators: [
      { name: 'RSI (14)', value: '62', signal: 'bullish' },
      { name: 'MACD', value: 'Bullish Cross', signal: 'bullish' },
      { name: 'MA 50', value: 'Above', signal: 'bullish' },
      { name: 'MA 200', value: 'Above', signal: 'bullish' },
    ],
    patterns: ['Higher Highs', 'Bull Flag', 'Support Bounce'],
  },
  tradeScenarios: {
    buy: {
      entry: '2,348.00',
      stopLoss: '2,338.00',
      takeProfit: '2,370.00',
      riskReward: '1:2.2',
      reasoning: 'Enter on pullback to previous resistance-turned-support. Strong bullish momentum supports continuation.',
    },
    sell: {
      entry: '2,355.00',
      stopLoss: '2,365.00',
      takeProfit: '2,335.00',
      riskReward: '1:2',
      reasoning: 'Counter-trend trade at resistance. Only valid if clear rejection candle forms.',
    },
  },
  fundamentalAnalysis: {
    summary: 'USD showing weakness ahead of Fed decision. Gold benefiting from safe-haven flows amid geopolitical tensions. Inflation data supports dovish Fed stance.',
    overallBias: 'bullish',
    news: [
      { title: 'Fed expected to hold rates steady', impact: 'high', bias: 'bullish' },
      { title: 'Middle East tensions escalate', impact: 'medium', bias: 'bullish' },
      { title: 'US Treasury yields decline', impact: 'medium', bias: 'bullish' },
    ],
    upcomingEvents: [
      'FOMC Meeting Minutes - Tomorrow 2:00 PM EST',
      'US CPI Data - Friday 8:30 AM EST',
    ],
  },
  finalDecision: {
    decision: 'buy',
    summary: 'Technical and fundamental factors align for bullish continuation. Strong trend structure with supportive macro backdrop. Recommended BUY on pullback to 2,348 with tight risk management.',
    warnings: [
      'High-impact news event tomorrow - reduce position size',
      'Price near psychological resistance at 2,350',
    ],
    riskGuidance: 'Risk 1-2% of account. Avoid overtrading before FOMC. Consider scaling out at first target.',
  },
};

export default function Index() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleImageUpload = async (imageData: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay - will be replaced with real AI call
    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Disclaimer */}
        <div className="mb-6 p-4 rounded-xl bg-warning/10 border border-warning/20 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-warning">Disclaimer:</span> This tool provides analysis for educational purposes only. 
            Trading involves significant risk. Always conduct your own research and never risk more than you can afford to lose.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload & Overview */}
          <div className="space-y-6">
            <ChartUpload onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />
            
            {analysis && (
              <>
                <MarketBias
                  bias={analysis.marketBias}
                  confidence={analysis.confidence}
                  asset={analysis.asset}
                  timeframe={analysis.timeframe}
                  currentPrice={analysis.currentPrice}
                />
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <TradeScenario
                    type="buy"
                    entry={analysis.tradeScenarios.buy.entry}
                    stopLoss={analysis.tradeScenarios.buy.stopLoss}
                    takeProfit={analysis.tradeScenarios.buy.takeProfit}
                    riskReward={analysis.tradeScenarios.buy.riskReward}
                    reasoning={analysis.tradeScenarios.buy.reasoning}
                  />
                  <TradeScenario
                    type="sell"
                    entry={analysis.tradeScenarios.sell.entry}
                    stopLoss={analysis.tradeScenarios.sell.stopLoss}
                    takeProfit={analysis.tradeScenarios.sell.takeProfit}
                    riskReward={analysis.tradeScenarios.sell.riskReward}
                    reasoning={analysis.tradeScenarios.sell.reasoning}
                  />
                </div>
              </>
            )}
          </div>

          {/* Right Column - Analysis Details */}
          <div className="space-y-6">
            {analysis ? (
              <>
                <TechnicalAnalysis
                  structure={analysis.technicalAnalysis.structure}
                  keyLevels={analysis.technicalAnalysis.keyLevels}
                  indicators={analysis.technicalAnalysis.indicators}
                  patterns={analysis.technicalAnalysis.patterns}
                />
                
                <FundamentalAnalysis
                  summary={analysis.fundamentalAnalysis.summary}
                  overallBias={analysis.fundamentalAnalysis.overallBias}
                  news={analysis.fundamentalAnalysis.news}
                  upcomingEvents={analysis.fundamentalAnalysis.upcomingEvents}
                />
                
                <FinalDecision
                  decision={analysis.finalDecision.decision}
                  summary={analysis.finalDecision.summary}
                  warnings={analysis.finalDecision.warnings}
                  riskGuidance={analysis.finalDecision.riskGuidance}
                />
              </>
            ) : (
              <AnalysisPlaceholder />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            TradeAI © 2024 • Not financial advice • Trade responsibly
          </p>
        </div>
      </footer>
    </div>
  );
}
