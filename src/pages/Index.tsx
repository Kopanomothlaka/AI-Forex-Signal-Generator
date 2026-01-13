import { Header } from '@/components/Header';
import { ChartUpload } from '@/components/ChartUpload';
import { MarketBias } from '@/components/MarketBias';
import { TradeScenario } from '@/components/TradeScenario';
import { TechnicalAnalysis } from '@/components/TechnicalAnalysis';
import { FundamentalAnalysis } from '@/components/FundamentalAnalysis';
import { FinalDecision } from '@/components/FinalDecision';
import { AnalysisPlaceholder } from '@/components/AnalysisPlaceholder';
import { RiskCalculator } from '@/components/RiskCalculator';
import { useChartAnalysis } from '@/hooks/useChartAnalysis';
import { AlertTriangle } from 'lucide-react';

export default function Index() {
  const { isAnalyzing, analysis, analyzeChart } = useChartAnalysis();

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
            <ChartUpload onImageUpload={analyzeChart} isAnalyzing={isAnalyzing} />
            
            {analysis && (
              <>
                <MarketBias
                  bias={analysis.marketBias}
                  confidence={analysis.confidence}
                  asset={analysis.asset}
                  timeframe={analysis.timeframe}
                  currentPrice={analysis.currentPrice}
                />
                
                <RiskCalculator
                  entryPrice={analysis.tradeScenarios.buy.entry}
                  stopLoss={analysis.tradeScenarios.buy.stopLoss}
                  takeProfit={analysis.tradeScenarios.buy.takeProfit}
                  asset={analysis.asset}
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
