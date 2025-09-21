import { useState } from 'react';
import { Building2, Ruler, Wrench, Calculator } from 'lucide-react';

const RechargeStructureSuggestion = ({ setIsLoading }) => {
  const [inputData, setInputData] = useState({
    roofArea: '',
    soilType: '',
    waterTable: '',
    budget: ''
  });

  const [suggestions, setSuggestions] = useState(null);
  const [output, setOutput] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const structures = [
        {
          type: 'Recharge Well',
          dimensions: '3m diameter x 15m depth',
          capacity: '5000 L/day',
          cost: '₹25,000 - ₹35,000',
          suitability: 'High',
          description: 'Deep vertical shaft for direct aquifer recharge'
        },
        {
          type: 'Recharge Pit',
          dimensions: '3m x 3m x 2m',
          capacity: '3000 L/day',
          cost: '₹15,000 - ₹20,000',
          suitability: 'Medium',
          description: 'Surface infiltration system with filter layers'
        },
        {
          type: 'Soakaway',
          dimensions: '2m x 2m x 3m',
          capacity: '2000 L/day',
          cost: '₹10,000 - ₹15,000',
          suitability: 'Good',
          description: 'Gravel-filled pit for gradual water infiltration'
        }
      ];
      if (inputData.roofArea > 1000 && inputData.budget == 'high') {
          setOutput(structures[0]);
       }
       else if (inputData.roofArea > 1000 && inputData.budget == 'low') {
       setOutput(structures[1]);
       }
       else if (inputData.roofArea < 1000 && inputData.budget == 'medium') {
       setOutput(structures[2]);
       }
       else if (inputData.roofArea > 500 && inputData.budget == 'low') {
       setOutput(structures[1]);
       }
       else if (inputData.roofArea > 500 && inputData.budget == 'medium') {
       setOutput(structures[2]);
       }
       else if (inputData.roofArea > 500 && inputData.budget == 'high') {
       setOutput(structures[0]);
       }
       else{
          setOutput("please select valid options");
       }
       console.log(output);
       console.log(inputData);
      
      setSuggestions({
        structures,
        recommended: output,
        totalCapacity: structures.reduce((sum, s) => sum + parseInt(s.capacity), 0),
        implementationTime: '2-3 weeks'
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground mb-2">RTRWH Structure Recommendations</h2>
        <p className="text-card-foreground/70">
          Get customized recharge structure suggestions based on your requirements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-card-foreground font-medium mb-2">
            <Building2 className="inline w-4 h-4 mr-2" />
            Roof Area (sq ft)
          </label>
          <input
            type="number"
            value={inputData.roofArea}
            onChange={(e) => setInputData({ ...inputData, roofArea: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="e.g., 1000"
            required
          />
        </div>

        <div>
          <label className="block text-card-foreground font-medium mb-2">
            Soil Type
          </label>
          <select
            value={inputData.soilType}
            onChange={(e) => setInputData({ ...inputData, soilType: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            required
          >
            <option className='text-black font-semibold' value="">Select soil type</option>
            <option className='text-black' value="clay">Clay</option>
            <option className='text-black' value="sandy">Sandy</option>
            <option className='text-black' value="loamy">Loamy</option>
            <option className='text-black' value="rocky">Rocky</option>
          </select>
        </div>

        <div>
          <label className="block text-card-foreground font-medium mb-2">
            <Ruler className="inline w-4 h-4 mr-2" />
            Water Table Depth (ft)
          </label>
          <input
            type="number"
            value={inputData.waterTable}
            onChange={(e) => setInputData({ ...inputData, waterTable: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="e.g., 20"
            required
          />
        </div>

        <div>
          <label className="block text-card-foreground font-medium mb-2">
            <Calculator className="inline w-4 h-4 mr-2" />
            Budget Range (₹)
          </label>
          <select
            value={inputData.budget}
            onChange={(e) => setInputData({ ...inputData, budget: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            required
          >
            <option className='text-black font-semibold' value="">Select budget range</option>
            <option className='text-black' value="low">₹10,000 - ₹25,000</option>
            <option className='text-black' value="medium">₹25,000 - ₹50,000</option>
            <option className='text-black' value="high">₹50,000+</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Get Structure Recommendations
          </button>
        </div>
      </form>

      {suggestions && (
        <div className="space-y-6">
          {/* Recommended Structure */}
          <div className="p-6 bg-accent/10 border border-accent/30 rounded-lg">
            <h3 className="text-xl font-bold text-card-foreground mb-4">
              Recommended: {suggestions.recommended.type}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">Specifications</h4>
                <p className="text-card-foreground/70">{suggestions.recommended.dimensions}</p>
                <p className="text-card-foreground/70">Capacity: {suggestions.recommended.capacity}</p>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">Cost Estimate</h4>
                <p className="text-card-foreground/70">{suggestions.recommended.cost}</p>
                <p className="text-card-foreground/70">Implementation: {suggestions.implementationTime}</p>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">Suitability</h4>
                <p className="text-card-foreground/70">{suggestions.recommended.suitability}</p>
                <p className="text-card-foreground/70">{suggestions.recommended.description}</p>
              </div>
            </div>
          </div>

          {/* All Structure Options */}
          <div>
            <h3 className="text-xl font-bold text-card-foreground mb-4">All Available Options</h3>
            <div className="grid grid-cols-1 gap-4">
              {suggestions.structures.map((structure, index) => (
                <div key={index} className="p-4 bg-card/30 border border-border/30 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <h4 className="font-semibold text-card-foreground">{structure.type}</h4>
                      <p className="text-sm text-card-foreground/70">{structure.description}</p>
                    </div>
                    <div>
                      <div className="text-sm text-card-foreground/70">Dimensions</div>
                      <div className="text-card-foreground">{structure.dimensions}</div>
                    </div>
                    <div>
                      <div className="text-sm text-card-foreground/70">Capacity</div>
                      <div className="text-card-foreground">{structure.capacity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-card-foreground/70">Cost</div>
                      <div className="text-card-foreground">{structure.cost}</div>
                    </div>
                    <div>
                      <div className="text-sm text-card-foreground/70">Suitability</div>
                      <div className={`font-medium ${
                        structure.suitability === 'High' ? 'text-green-600' :
                        structure.suitability === 'Medium' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>
                        {structure.suitability}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Construction Guidelines */}
          <div className="p-6 bg-card/30 border border-border/30 rounded-lg">
            <h3 className="text-lg font-semibold text-card-foreground mb-3">Construction Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-card-foreground mb-2">Pre-construction</h4>
                <ul className="space-y-1 text-card-foreground/70 text-sm">
                  <li>• Soil permeability test</li>
                  <li>• Groundwater level assessment</li>
                  <li>• Site preparation and marking</li>
                  <li>• Obtain necessary permits</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-card-foreground mb-2">Post-construction</h4>
                <ul className="space-y-1 text-card-foreground/70 text-sm">
                  <li>• Regular maintenance schedule</li>
                  <li>• Periodic cleaning of filters</li>
                  <li>• Monitor recharge effectiveness</li>
                  <li>• Water quality testing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RechargeStructureSuggestion;
