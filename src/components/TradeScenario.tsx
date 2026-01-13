import { ArrowUpCircle, ArrowDownCircle, Target, XCircle, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TradeScenarioProps {
  type: 'buy' | 'sell';
  entry: string;
  stopLoss: string;
  takeProfit: string;
  riskReward?: string;
  reasoning?: string;
}

export function TradeScenario({ type, entry, stopLoss, takeProfit, riskReward, reasoning }: TradeScenarioProps) {
  const isBuy = type === 'buy';
  
  return (
    <div className={cn(
      "glass-card p-5 transition-all duration-300 hover:scale-[1.01]",
      isBuy ? "border-bullish/20 hover:border-bullish/40" : "border-bearish/20 hover:border-bearish/40"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {isBuy ? (
            <div className="p-2 rounded-lg bg-bullish/20">
              <ArrowUpCircle className="w-5 h-5 text-bullish" />
            </div>
          ) : (
            <div className="p-2 rounded-lg bg-bearish/20">
              <ArrowDownCircle className="w-5 h-5 text-bearish" />
            </div>
          )}
          <h3 className={cn(
            "text-lg font-bold",
            isBuy ? "text-bullish" : "text-bearish"
          )}>
            {isBuy ? 'BUY SCENARIO' : 'SELL SCENARIO'}
          </h3>
        </div>
        {riskReward && (
          <Badge variant="secondary" className="font-mono">
            R:R {riskReward}
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Entry</span>
          </div>
          <span className="font-mono font-semibold text-foreground">{entry}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-bearish/10">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-bearish" />
            <span className="text-sm text-muted-foreground">Stop Loss</span>
          </div>
          <span className="font-mono font-semibold text-bearish">{stopLoss}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-bullish/10">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-bullish" />
            <span className="text-sm text-muted-foreground">Take Profit</span>
          </div>
          <span className="font-mono font-semibold text-bullish">{takeProfit}</span>
        </div>
      </div>

      {reasoning && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground leading-relaxed">{reasoning}</p>
        </div>
      )}
    </div>
  );
}
