import { useState } from 'react';
import { MapPin, Users, Home, TreePine } from 'lucide-react';

const FeasibilityForm = ({ setIsLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    dwellers: '',
    roofArea: '',
    openSpace: ''
  });

  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const feasibilityScore = Math.floor(Math.random() * 40) + 60; // 60-100%
      setResults({
        feasibilityScore,
        waterPotential: Math.floor(formData.roofArea * 0.8 * 500), // Rough calculation
        recommendation: feasibilityScore > 80 ? 'Highly Recommended' : 'Moderately Recommended'
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground mb-2">Feasibility Assessment</h2>
        <p className="text-card-foreground/70">
          Enter your property details to assess rainwater harvesting feasibility
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-card-foreground font-medium mb-2">
            <Users className="inline w-4 h-4 mr-2" />
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-card-foreground font-medium mb-2">
            <MapPin className="inline w-4 h-4 mr-2" />
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="City, State"
            required
          />
        </div>

        <div>
          <label className="block text-card-foreground font-medium mb-2">
            <Users className="inline w-4 h-4 mr-2" />
            Number of Dwellers
          </label>
          <input
            type="number"
            value={formData.dwellers}
            onChange={(e) => setFormData({ ...formData, dwellers: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="e.g., 4"
            required
          />
        </div>

        <div>
          <label className="block text-card-foreground font-medium mb-2">
            <Home className="inline w-4 h-4 mr-2" />
            Roof Area (sq ft)
          </label>
          <input
            type="number"
            value={formData.roofArea}
            onChange={(e) => setFormData({ ...formData, roofArea: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="e.g., 1000"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-card-foreground font-medium mb-2">
            <TreePine className="inline w-4 h-4 mr-2" />
            Open Space Area (sq ft)
          </label>
          <input
            type="number"
            value={formData.openSpace}
            onChange={(e) => setFormData({ ...formData, openSpace: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="e.g., 500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Assess Feasibility
          </button>
        </div>
      </form>

      {results && (
        <div className="mt-8 p-6 bg-accent/10 border border-accent/30 rounded-lg">
          <h3 className="text-xl font-bold text-card-foreground mb-4">Assessment Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{results.feasibilityScore}%</div>
              <div className="text-card-foreground/70">Feasibility Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{results.waterPotential.toLocaleString()}</div>
              <div className="text-card-foreground/70">Liters/Year Potential</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-card-foreground">{results.recommendation}</div>
              <div className="text-card-foreground/70">Overall Rating</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeasibilityForm;