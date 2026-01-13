import { Newspaper, Calendar, AlertTriangle, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NewsItem {
  title: string;
  impact: 'high' | 'medium' | 'low';
  bias: 'bullish' | 'bearish' | 'neutral';
}

interface FundamentalAnalysisProps {
  news?: NewsItem[];
  upcomingEvents?: string[];
  summary?: string;
  overallBias?: 'bullish' | 'bearish' | 'neutral';
}

export function FundamentalAnalysis({ news, upcomingEvents, summary, overallBias }: FundamentalAnalysisProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Fundamental Analysis</h3>
        </div>
        {overallBias && (
          <Badge variant={overallBias}>
            {overallBias.toUpperCase()}
          </Badge>
        )}
      </div>

      <div className="space-y-5">
        {summary && (
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-sm text-foreground leading-relaxed">{summary}</p>
          </div>
        )}

        {news && news.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Newspaper className="w-3 h-3" />
              RELEVANT NEWS
            </h4>
            <div className="space-y-2">
              {news.map((item, i) => (
                <div key={i} className="flex items-start justify-between p-3 rounded-lg bg-muted/20">
                  <span className="text-sm text-foreground flex-1">{item.title}</span>
                  <div className="flex items-center gap-2 ml-3">
                    <Badge variant={item.impact}>{item.impact.toUpperCase()}</Badge>
                    <Badge variant={item.bias}>{item.bias.toUpperCase()}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {upcomingEvents && upcomingEvents.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              UPCOMING EVENTS
            </h4>
            <div className="space-y-2">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-warning/10 border border-warning/20">
                  <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
                  <span className="text-sm text-foreground">{event}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
