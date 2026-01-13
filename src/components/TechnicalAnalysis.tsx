import { BarChart3, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TechnicalAnalysisProps {
  structure?: string;
  keyLevels?: {
    support: string[];
    resistance: string[];
  };
  indicators?: {
    name: string;
    value: string;
    signal: 'bullish' | 'bearish' | 'neutral';
  }[];
  patterns?: string[];
}

export function TechnicalAnalysis({ structure, keyLevels, indicators, patterns }: TechnicalAnalysisProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-primary/10">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Technical Analysis</h3>
      </div>

      <div className="space-y-5">
        {structure && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2">MARKET STRUCTURE</h4>
            <p className="text-sm text-foreground">{structure}</p>
          </div>
        )}

        {keyLevels && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <TrendingDown className="w-3 h-3 text-bullish" />
                SUPPORT LEVELS
              </h4>
              <div className="space-y-1">
                {keyLevels.support.map((level, i) => (
                  <div key={i} className="px-3 py-1.5 rounded-md bg-bullish/10 border border-bullish/20">
                    <span className="font-mono text-sm text-bullish">{level}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <TrendingUp className="w-3 h-3 text-bearish" />
                RESISTANCE LEVELS
              </h4>
              <div className="space-y-1">
                {keyLevels.resistance.map((level, i) => (
                  <div key={i} className="px-3 py-1.5 rounded-md bg-bearish/10 border border-bearish/20">
                    <span className="font-mono text-sm text-bearish">{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {indicators && indicators.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Activity className="w-3 h-3" />
              INDICATORS
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {indicators.map((ind, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground">{ind.name}</span>
                  <Badge variant={ind.signal === 'bullish' ? 'bullish' : ind.signal === 'bearish' ? 'bearish' : 'neutral'}>
                    {ind.value}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {patterns && patterns.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2">PATTERNS IDENTIFIED</h4>
            <div className="flex flex-wrap gap-2">
              {patterns.map((pattern, i) => (
                <Badge key={i} variant="secondary">{pattern}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
