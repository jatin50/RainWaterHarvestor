import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, ChevronRight } from 'lucide-react';

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/30 flex items-center justify-center">
      {!showContent ? (
        <div className="text-center space-y-6 animate-pulse">
          <div className="flex justify-center">
            <Droplets className="w-20 h-20 text-primary animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold text-primary">RainWater Harvesting</h1>
          <p className="text-lg text-muted-foreground">Feasibility Assessment System</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto text-center space-y-8 p-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AquaWise
            </h1>
            <p className="text-3xl text-white font-semibold">
              Smart Rainwater Harvesting & RTRWH Solutions
            </p>
          </div>
          
          <div className="  bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-border/50">
            <p className="text-lg text-card-foreground/80 mb-6">
              Discover the feasibility of rainwater harvesting for your location with our 
              AI-powered assessment system. Get personalized recommendations for RTRWH 
              structures and cost-benefit analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/login')}
                className="px-8 py-3 outline-1 rounded-lg hover:bg-sky-300 transition-colors flex items-center justify-center gap-2"
              >
                Get Started <ChevronRight className="w-5 h-5 " />
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="px-8 py-3 border border-border bg-card text-card-foreground rounded-lg hover:bg-sky-300 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card/30 p-6 rounded-lg border border-border/30">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Feasibility Analysis</h3>
              <p className="text-card-foreground/70">Get detailed analysis of rainwater harvesting potential</p>
            </div>
            <div className="bg-card/30 p-6 rounded-lg border border-border/30">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">RTRWH Structures</h3>
              <p className="text-card-foreground/70">Recommended recharge structures and dimensions</p>
            </div>
            <div className="bg-card/30 p-6 rounded-lg border border-border/30">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Cost Analysis</h3>
              <p className="text-card-foreground/70">Complete cost-benefit analysis and ROI calculations</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;