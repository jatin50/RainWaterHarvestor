import { Droplets } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <Droplets className="w-12 h-12 text-primary animate-bounce" />
        <div className="absolute inset-0 w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-muted-foreground animate-pulse">Processing your request...</p>
    </div>
  );
};

export default LoadingSpinner