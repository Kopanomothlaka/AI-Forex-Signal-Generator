import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MarketBiasProps {
  bias: 'bullish' | 'bearish' | 'range' | null;
  confidence: 'high' | 'medium' | 'low' | null;
  asset?: string;
  timeframe?: string;
  currentPrice?: string;
}

export function MarketBias({ bias, confidence, asset, timeframe, currentPrice }: MarketBiasProps) {
  const getBiasConfig = () => {
    switch (bias) {
      case 'bullish':
        return {
          icon: TrendingUp,
          label: 'BULLISH',
          color: 'text-bullish',
          bg: 'bg-bullish/10',
          border: 'border-bullish/30',
          glow: 'glow-success'
        };
      case 'bearish':
        return {
          icon: TrendingDown,
          label: 'BEARISH',
          color: 'text-bearish',
          bg: 'bg-bearish/10',
          border: 'border-bearish/30',
          glow: 'glow-danger'
        };
      case 'range':
        return {
          icon: Minus,
          label: 'RANGE',
          color: 'text-warning',
          bg: 'bg-warning/10',
          border: 'border-warning/30',
          glow: ''
        };
      default:
        return {
          icon: Minus,
          label: 'ANALYZING',
          color: 'text-muted-foreground',
          bg: 'bg-muted/10',
          border: 'border-muted',
          glow: ''
        };
    }
  };

  const config = getBiasConfig();
  const Icon = config.icon;

  return (
    <div className={cn(
      "glass-card p-6 transition-all duration-500",
      config.border,
      bias && config.glow
    )}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">MARKET BIAS</h3>
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              config.bg
            )}>
              <Icon className={cn("w-6 h-6", config.color)} />
            </div>
            <span className={cn("text-2xl font-bold", config.color)}>
              {config.label}
            </span>
          </div>
        </div>
        {confidence && (
          <Badge variant={confidence}>
            {confidence.toUpperCase()} CONFIDENCE
          </Badge>
        )}
      </div>

      {(asset || timeframe || currentPrice) && (
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          {asset && (
            <div>
              <p className="text-xs text-muted-foreground">ASSET</p>
              <p className="text-sm font-mono font-semibold text-foreground">{asset}</p>
            </div>
          )}
          {timeframe && (
            <div>
              <p className="text-xs text-muted-foreground">TIMEFRAME</p>
              <p className="text-sm font-mono font-semibold text-foreground">{timeframe}</p>
            </div>
          )}
          {currentPrice && (
            <div>
              <p className="text-xs text-muted-foreground">PRICE</p>
              <p className="text-sm font-mono font-semibold text-primary">{currentPrice}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
