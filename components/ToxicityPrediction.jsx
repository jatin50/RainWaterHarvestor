import { useState } from 'react';
import { TestTube, AlertTriangle, CheckCircle } from 'lucide-react';

const ToxicityPrediction = ({ setIsLoading }) => {
  const [inputData, setInputData] = useState({
    ph: '',
    tds: '',
    turbidity: '',
    location: ''
  });

  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const toxicityLevel = Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low';
      const qualityScore = toxicityLevel === 'Low' ? 85 : toxicityLevel === 'Medium' ? 65 : 45;
      
      setResults({
        toxicityLevel,
        qualityScore,
        drinkable: qualityScore > 70,
        recommendations: [
          'Install first-flush diverter',
          'Use filtration system',
          'Regular testing recommended'
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground mb-2">Water Quality Prediction</h2>
        <p className="text-card-foreground/70">
          Analyze water quality parameters to predict toxicity levels
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-card-foreground font-medium mb-2">
            <TestTube className="inline w-4 h-4 mr-2" />
            pH Level
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="14"
            value={inputData.ph}
            onChange={(e) => setInputData({ ...inputData, ph: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="6.5 - 8.5"
            required
          />
        </div>

        <div>
          <label className="block text-card-foreground font-medium mb-2">
            TDS (ppm)
          </label>
          <input
            type="number"
            value={inputData.tds}
            onChange={(e) => setInputData({ ...inputData, tds: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="< 500 ppm recommended"
            required
          />
        </div>

        <div>
          <label className="block text-card-foreground font-medium mb-2">
            Turbidity (NTU)
          </label>
          <input
            type="number"
            step="0.1"
            value={inputData.turbidity}
            onChange={(e) => setInputData({ ...inputData, turbidity: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="< 1 NTU recommended"
            required
          />
        </div>

        <div>
          <label className="block text-card-foreground font-medium mb-2">
            Collection Area
          </label>
          <select
            value={inputData.location}
            onChange={(e) => setInputData({ ...inputData, location: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            required
          >
            <option className='text-black font-semibold' value="">Select collection area</option>
            <option className='text-black' value="roof">Roof Catchment</option>
            <option className='text-black' value="ground">Ground Catchment</option>
            <option className='text-black' value="industrial">Industrial Area</option>
            <option className='text-black' value="residential">Residential Area</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Analyze Water Quality
          </button>
        </div>
      </form>

      {results && (
        <div className="mt-8 p-6 bg-accent/10 border border-accent/30 rounded-lg">
          <h3 className="text-xl font-bold text-card-foreground mb-4">Quality Analysis Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                results.toxicityLevel === 'Low' ? 'text-green-600' : 
                results.toxicityLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {results.toxicityLevel}
              </div>
              <div className="text-card-foreground/70">Toxicity Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{results.qualityScore}%</div>
              <div className="text-card-foreground/70">Quality Score</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {results.drinkable ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                )}
              </div>
              <div className="text-card-foreground/70">
                {results.drinkable ? 'Safe for Use' : 'Requires Treatment'}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-2">Recommendations:</h4>
            <ul className="space-y-1">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="text-card-foreground/70">• {rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToxicityPrediction;
