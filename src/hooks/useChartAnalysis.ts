import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AnalysisResult } from '@/types/analysis';
import { useToast } from '@/hooks/use-toast';

export function useChartAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeChart = async (imageData: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('analyze-chart', {
        body: { imageData }
      });

      if (fnError) {
        throw new Error(fnError.message || 'Failed to analyze chart');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setAnalysis(data as AnalysisResult);
      toast({
        title: "Analysis Complete",
        description: `${data.asset} on ${data.timeframe} - ${data.marketBias.toUpperCase()} bias detected`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to analyze chart';
      setError(message);
      toast({
        title: "Analysis Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAnalysis = () => {
    setAnalysis(null);
    setError(null);
  };

  return {
    isAnalyzing,
    analysis,
    error,
    analyzeChart,
    clearAnalysis,
  };
}
