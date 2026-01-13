import { BarChart3, TrendingUp, Globe, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AnalysisPlaceholder() {
  const items = [
    { icon: BarChart3, label: 'Technical Analysis', description: 'Chart patterns & indicators' },
    { icon: TrendingUp, label: 'Trade Scenarios', description: 'Entry, SL & TP levels' },
    { icon: Globe, label: 'Fundamentals', description: 'News & market events' },
    { icon: Target, label: 'Final Decision', description: 'AI recommendation' },
  ];

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "glass-card p-6 flex items-center gap-4",
            "opacity-50"
          )}
        >
          <div className="p-3 rounded-xl bg-muted/30">
            <item.icon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">{item.label}</h3>
            <p className="text-sm text-muted-foreground/70">{item.description}</p>
          </div>
        </div>
      ))}
      
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Upload a trading chart to begin analysis
        </p>
      </div>
    </div>
  );
}
