import { useState } from 'react';
import { Cloud, CloudRain, Sun, TrendingUp } from 'lucide-react';

const RainfallData = ({ setIsLoading }) => {
  const [location, setLocation] = useState('');
  const [rainfallData, setRainfallData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const monthlyData = [
        { month: 'Jan', rainfall: Math.floor(Math.random() * 50) + 10 },
        { month: 'Feb', rainfall: Math.floor(Math.random() * 60) + 15 },
        { month: 'Mar', rainfall: Math.floor(Math.random() * 80) + 20 },
        { month: 'Apr', rainfall: Math.floor(Math.random() * 100) + 30 },
        { month: 'May', rainfall: Math.floor(Math.random() * 150) + 50 },
        { month: 'Jun', rainfall: Math.floor(Math.random() * 200) + 100 },
        { month: 'Jul', rainfall: Math.floor(Math.random() * 250) + 150 },
        { month: 'Aug', rainfall: Math.floor(Math.random() * 200) + 120 },
        { month: 'Sep', rainfall: Math.floor(Math.random() * 150) + 80 },
        { month: 'Oct', rainfall: Math.floor(Math.random() * 100) + 40 },
        { month: 'Nov', rainfall: Math.floor(Math.random() * 70) + 20 },
        { month: 'Dec', rainfall: Math.floor(Math.random() * 50) + 15 },
      ];
      
      const totalRainfall = monthlyData.reduce((sum, month) => sum + month.rainfall, 0);
      
      setRainfallData({
        location,
        monthlyData,
        totalRainfall,
        averageRainfall: Math.round(totalRainfall / 12),
        peakMonth: monthlyData.reduce((max, month) => month.rainfall > max.rainfall ? month : max),
        rainyDays: Math.floor(Math.random() * 100) + 80,
        lastUpdated: new Date().toLocaleDateString()
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground mb-2">Rainfall Data & Statistics</h2>
        <p className="text-card-foreground/70">
          View historical rainfall patterns and seasonal trends
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="flex-1">
          <label className="block text-card-foreground font-medium mb-2">
            <Cloud className="inline w-4 h-4 mr-2" />
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
            Get Data
          </button>
        </div>
      </form>

      {rainfallData && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card/50 p-4 rounded-lg border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <CloudRain className="w-5 h-5 text-primary" />
                <span className="font-medium text-card-foreground">Total Rainfall</span>
              </div>
              <div className="text-2xl font-bold text-card-foreground">{rainfallData.totalRainfall}mm</div>
              <div className="text-sm text-card-foreground/70">Annual total</div>
            </div>

            <div className="bg-card/50 p-4 rounded-lg border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="font-medium text-card-foreground">Average</span>
              </div>
              <div className="text-2xl font-bold text-card-foreground">{rainfallData.averageRainfall}mm</div>
              <div className="text-sm text-card-foreground/70">Monthly average</div>
            </div>

            <div className="bg-card/50 p-4 rounded-lg border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-card-foreground">Peak Month</span>
              </div>
              <div className="text-2xl font-bold text-card-foreground">{rainfallData.peakMonth.month}</div>
              <div className="text-sm text-card-foreground/70">{rainfallData.peakMonth.rainfall}mm</div>
            </div>

            <div className="bg-card/50 p-4 rounded-lg border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <CloudRain className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-card-foreground">Rainy Days</span>
              </div>
              <div className="text-2xl font-bold text-card-foreground">{rainfallData.rainyDays}</div>
              <div className="text-sm text-card-foreground/70">Days per year</div>
            </div>
          </div>

          {/* Monthly Chart */}
          <div className="p-6 bg-card/30 border border-border/30 rounded-lg">
            <h3 className="text-xl font-bold text-card-foreground mb-4">Monthly Rainfall Distribution</h3>
            <div className="space-y-3">
              {rainfallData.monthlyData.map((month, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 text-sm text-card-foreground/70 font-medium">
                    {month.month}
                  </div>
                  <div className="flex-1 bg-muted rounded-full h-6 relative">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-6 rounded-full transition-all duration-500"
                      style={{ width: `${(month.rainfall / 300) * 100}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-card-foreground">
                      {month.rainfall}mm
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-card/30 border border-border/30 rounded-lg">
              <h4 className="text-lg font-semibold text-card-foreground mb-3">Seasonal Patterns</h4>
              <div className="space-y-2 text-card-foreground/70">
                <div>• Monsoon season: June - September</div>
                <div>• Pre-monsoon: March - May</div>
                <div>• Post-monsoon: October - February</div>
                <div>• Peak rainfall typically in July-August</div>
              </div>
            </div>

            <div className="p-6 bg-card/30 border border-border/30 rounded-lg">
              <h4 className="text-lg font-semibold text-card-foreground mb-3">Harvesting Potential</h4>
              <div className="space-y-2 text-card-foreground/70">
                <div>• Best collection months: Jun-Sep</div>
                <div>• Expected yield: 70-85% of rainfall</div>
                <div>• Storage requirements: 3-4 months capacity</div>
                <div>• Last updated: {rainfallData.lastUpdated}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RainfallData;