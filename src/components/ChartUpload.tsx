import { useState, useCallback } from 'react';
import { Upload, Image, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChartUploadProps {
  onImageUpload: (imageData: string) => void;
  isAnalyzing: boolean;
}

export function ChartUpload({ onImageUpload, isAnalyzing }: ChartUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onImageUpload(result);
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const clearImage = useCallback(() => {
    setPreview(null);
  }, []);

  return (
    <div className="w-full">
      {!preview ? (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-64 rounded-xl cursor-pointer transition-all duration-300",
            "border-2 border-dashed",
            isDragging 
              ? "border-primary bg-primary/5 glow-primary" 
              : "border-border hover:border-primary/50 hover:bg-muted/30",
            "group"
          )}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          
          <div className={cn(
            "flex flex-col items-center gap-4 transition-transform duration-300",
            isDragging ? "scale-110" : "group-hover:scale-105"
          )}>
            <div className={cn(
              "p-4 rounded-full transition-all duration-300",
              isDragging ? "bg-primary/20" : "bg-muted group-hover:bg-primary/10"
            )}>
              <Upload className={cn(
                "w-8 h-8 transition-colors",
                isDragging ? "text-primary" : "text-muted-foreground group-hover:text-primary"
              )} />
            </div>
            
            <div className="text-center">
              <p className="text-lg font-medium text-foreground">
                {isDragging ? "Drop your chart here" : "Upload Trading Chart"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Drag & drop or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Supports TradingView, MT4/MT5, and other chart screenshots
              </p>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className={cn(
              "absolute inset-0 rounded-xl transition-opacity duration-300",
              isDragging ? "opacity-100" : "opacity-0",
              "bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
            )} />
          </div>
        </label>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-border bg-card">
          <img 
            src={preview} 
            alt="Chart preview" 
            className="w-full h-64 object-contain bg-background/50"
          />
          
          {isAnalyzing && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Analyzing chart...</p>
              </div>
            </div>
          )}
          
          {!isAnalyzing && (
            <button
              onClick={clearImage}
              className="absolute top-3 right-3 p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:bg-destructive/20 hover:border-destructive/50 transition-colors group"
            >
              <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
            </button>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image className="w-4 h-4" />
              <span>Chart uploaded • Ready for analysis</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
