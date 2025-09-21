import { useState } from 'react';
import { MapPin, Layers, Droplets, TrendingUp } from 'lucide-react';

const AquiferInfo = ({ setIsLoading }) => {
  const [location, setLocation] = useState('');
  const [aquiferData, setAquiferData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setAquiferData({
        aquiferName: `${location} Regional Aquifer`,
        depth: Math.floor(Math.random() * 50) + 20,
        waterLevel: Math.floor(Math.random() * 30) + 10,
        quality: ['Good', 'Fair', 'Excellent'][Math.floor(Math.random() * 3)],
        rechargeRate: Math.floor(Math.random() * 20) + 5,
        geology: 'Alluvial deposits with sandstone layers',
        salinity: Math.floor(Math.random() * 1000) + 200,
        yield: Math.floor(Math.random() * 15) + 5
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground mb-2">Local Aquifer Information</h2>
        <p className="text-card-foreground/70">
          Get detailed information about local groundwater aquifers
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="flex-1">
          <label className="block text-card-foreground font-medium mb-2">
            <MapPin className="inline w-4 h-4 mr-2" />
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="Enter city or area name"
            required
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {aquiferData && (
        <div className="space-y-6">
          <div className="p-6 bg-accent/10 border border-accent/30 rounded-lg">
            <h3 className="text-xl font-bold text-card-foreground mb-4">
              {aquiferData.aquiferName}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card/50 p-4 rounded-lg border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-5 h-5 text-primary" />
                  <span className="font-medium text-card-foreground">Depth</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground">{aquiferData.depth}m</div>
                <div className="text-sm text-card-foreground/70">Average depth</div>
              </div>

              <div className="bg-card/50 p-4 rounded-lg border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-accent" />
                  <span className="font-medium text-card-foreground">Water Level</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground">{aquiferData.waterLevel}m</div>
                <div className="text-sm text-card-foreground/70">Below ground</div>
              </div>

              <div className="bg-card/50 p-4 rounded-lg border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-card-foreground">Recharge Rate</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground">{aquiferData.rechargeRate}%</div>
                <div className="text-sm text-card-foreground/70">Annual rate</div>
              </div>

              <div className="bg-card/50 p-4 rounded-lg border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-card-foreground">Quality</span>
                </div>
                <div className="text-2xl font-bold text-card-foreground">{aquiferData.quality}</div>
                <div className="text-sm text-card-foreground/70">Overall rating</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-card/30 border border-border/30 rounded-lg">
              <h4 className="text-lg font-semibold text-card-foreground mb-3">Geological Properties</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-card-foreground/70">Formation:</span>
                  <span className="text-card-foreground">{aquiferData.geology}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-card-foreground/70">Salinity:</span>
                  <span className="text-card-foreground">{aquiferData.salinity} mg/L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-card-foreground/70">Yield:</span>
                  <span className="text-card-foreground">{aquiferData.yield} L/s</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card/30 border border-border/30 rounded-lg">
              <h4 className="text-lg font-semibold text-card-foreground mb-3">Recharge Recommendations</h4>
              <ul className="space-y-2 text-card-foreground/70">
                <li>• Install recharge wells in high permeability zones</li>
                <li>• Use check dams for surface water retention</li>
                <li>• Implement rainwater harvesting systems</li>
                <li>• Regular monitoring of water levels recommended</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AquiferInfo;
