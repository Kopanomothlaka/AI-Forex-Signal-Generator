import { CheckCircle, XCircle, Clock, AlertTriangle, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FinalDecisionProps {
  decision: 'buy' | 'sell' | 'wait' | null;
  summary?: string;
  warnings?: string[];
  riskGuidance?: string;
}

export function FinalDecision({ decision, summary, warnings, riskGuidance }: FinalDecisionProps) {
  const getDecisionConfig = () => {
    switch (decision) {
      case 'buy':
        return {
          icon: CheckCircle,
          label: 'BUY',
          color: 'text-bullish',
          bg: 'bg-bullish/10',
          border: 'border-bullish/30',
          glow: 'glow-success'
        };
      case 'sell':
        return {
          icon: XCircle,
          label: 'SELL',
          color: 'text-bearish',
          bg: 'bg-bearish/10',
          border: 'border-bearish/30',
          glow: 'glow-danger'
        };
      case 'wait':
        return {
          icon: Clock,
          label: 'WAIT',
          color: 'text-warning',
          bg: 'bg-warning/10',
          border: 'border-warning/30',
          glow: ''
        };
      default:
        return {
          icon: Clock,
          label: 'PENDING',
          color: 'text-muted-foreground',
          bg: 'bg-muted/10',
          border: 'border-muted',
          glow: ''
        };
    }
  };

  const config = getDecisionConfig();
  const Icon = config.icon;

  return (
    <div className={cn(
      "glass-card p-6 transition-all duration-500",
      config.border,
      decision && config.glow
    )}>
      <div className="flex items-center gap-3 mb-5">
        <div className={cn("p-3 rounded-xl", config.bg)}>
          <Icon className={cn("w-8 h-8", config.color)} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">FINAL DECISION</h3>
          <span className={cn("text-3xl font-bold", config.color)}>
            {config.label}
          </span>
        </div>
      </div>

      {summary && (
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50 mb-4">
          <p className="text-sm text-foreground leading-relaxed">{summary}</p>
        </div>
      )}

      {warnings && warnings.length > 0 && (
        <div className="space-y-2 mb-4">
          {warnings.map((warning, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
              <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{warning}</span>
            </div>
          ))}
        </div>
      )}

      {riskGuidance && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <span className="text-sm text-foreground">{riskGuidance}</span>
        </div>
      )}
    </div>
  );
}
