import { useState, useMemo } from 'react';
import { Calculator, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface RiskCalculatorProps {
  entryPrice?: string;
  stopLoss?: string;
  takeProfit?: string;
  asset?: string;
}

export function RiskCalculator({ entryPrice, stopLoss, takeProfit, asset }: RiskCalculatorProps) {
  const [accountBalance, setAccountBalance] = useState('10000');
  const [riskPercent, setRiskPercent] = useState('2');
  const [lotSize, setLotSize] = useState('0.1');

  const calculations = useMemo(() => {
    const balance = parseFloat(accountBalance) || 0;
    const risk = parseFloat(riskPercent) || 0;
    const lots = parseFloat(lotSize) || 0;
    
    // Parse prices (remove commas)
    const entry = parseFloat(entryPrice?.replace(/,/g, '') || '0');
    const sl = parseFloat(stopLoss?.replace(/,/g, '') || '0');
    const tp = parseFloat(takeProfit?.replace(/,/g, '') || '0');

    const riskAmount = (balance * risk) / 100;
    
    // Calculate pip values based on asset type
    const isGold = asset?.toUpperCase().includes('XAU');
    const isJPY = asset?.toUpperCase().includes('JPY');
    
    let pipValue = 10; // Standard for major pairs
    let pipSize = 0.0001;
    
    if (isGold) {
      pipValue = 10; // $10 per pip for 1 lot on gold
      pipSize = 0.1;
    } else if (isJPY) {
      pipSize = 0.01;
    }

    // Calculate pips
    const slPips = entry && sl ? Math.abs(entry - sl) / pipSize : 0;
    const tpPips = entry && tp ? Math.abs(tp - entry) / pipSize : 0;

    // Calculate potential loss and profit
    const pipValuePerLot = pipValue * lots;
    const potentialLoss = slPips * pipValuePerLot;
    const potentialProfit = tpPips * pipValuePerLot;

    // Suggested lot size based on risk
    const suggestedLotSize = slPips > 0 ? riskAmount / (slPips * pipValue) : 0;

    // ROI
    const roi = balance > 0 ? (potentialProfit / balance) * 100 : 0;

    return {
      riskAmount,
      potentialLoss,
      potentialProfit,
      slPips: slPips.toFixed(1),
      tpPips: tpPips.toFixed(1),
      suggestedLotSize: suggestedLotSize.toFixed(2),
      roi: roi.toFixed(2),
      riskRewardRatio: potentialLoss > 0 ? (potentialProfit / potentialLoss).toFixed(2) : '0',
    };
  }, [accountBalance, riskPercent, lotSize, entryPrice, stopLoss, takeProfit, asset]);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-primary/10">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Position Calculator</h3>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="balance" className="text-xs text-muted-foreground">Account Balance ($)</Label>
          <Input
            id="balance"
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            className="mt-1 font-mono bg-muted/30 border-border"
            placeholder="10000"
          />
        </div>
        <div>
          <Label htmlFor="risk" className="text-xs text-muted-foreground">Risk (%)</Label>
          <Input
            id="risk"
            type="number"
            value={riskPercent}
            onChange={(e) => setRiskPercent(e.target.value)}
            className="mt-1 font-mono bg-muted/30 border-border"
            placeholder="2"
            step="0.5"
            max="10"
          />
        </div>
        <div>
          <Label htmlFor="lots" className="text-xs text-muted-foreground">Lot Size</Label>
          <Input
            id="lots"
            type="number"
            value={lotSize}
            onChange={(e) => setLotSize(e.target.value)}
            className="mt-1 font-mono bg-muted/30 border-border"
            placeholder="0.1"
            step="0.01"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">Risk Amount</p>
            <p className="font-mono font-semibold text-foreground">
              ${calculations.riskAmount.toFixed(2)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">Suggested Lot Size</p>
            <p className="font-mono font-semibold text-primary">
              {calculations.suggestedLotSize} lots
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-bearish/10 border border-bearish/20">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-3 h-3 text-bearish" />
              <p className="text-xs text-muted-foreground">Potential Loss</p>
            </div>
            <p className="font-mono font-semibold text-bearish">
              -${calculations.potentialLoss.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {calculations.slPips} pips
            </p>
          </div>
          <div className="p-3 rounded-lg bg-bullish/10 border border-bullish/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3 h-3 text-bullish" />
              <p className="text-xs text-muted-foreground">Potential Profit</p>
            </div>
            <p className="font-mono font-semibold text-bullish">
              +${calculations.potentialProfit.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {calculations.tpPips} pips
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">Risk : Reward</p>
            <p className={cn(
              "font-mono font-semibold",
              parseFloat(calculations.riskRewardRatio) >= 2 ? "text-bullish" : 
              parseFloat(calculations.riskRewardRatio) >= 1 ? "text-warning" : "text-bearish"
            )}>
              1 : {calculations.riskRewardRatio}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-3 h-3 text-primary" />
              <p className="text-xs text-muted-foreground">Potential ROI</p>
            </div>
            <p className={cn(
              "font-mono font-semibold",
              parseFloat(calculations.roi) > 0 ? "text-bullish" : "text-muted-foreground"
            )}>
              +{calculations.roi}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
