import { BarChart3, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-amber-600 glow-primary">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 p-1 rounded-full bg-bullish animate-pulse">
              <Zap className="w-2 h-2 text-bullish-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient-gold">TradeAI</h1>
            <p className="text-xs text-muted-foreground">Advanced Market Analysis</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border">
            <div className="w-2 h-2 rounded-full bg-bullish animate-pulse" />
            <span className="text-xs text-muted-foreground">Markets Open</span>
          </div>
        </div>
      </div>
    </header>
  );
}
