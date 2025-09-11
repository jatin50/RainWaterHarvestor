import { useState } from 'react';
import { DollarSign, TrendingUp, Calculator, PieChart } from 'lucide-react';
const CostBenefitAnalysis = ({ setIsLoading }) => {
  const [projectData, setProjectData] = useState({
    systemType: '',
    initialCost: '',
    maintenance: '',
    waterSavings: '',
    lifespan: ''
  });

  const [analysis, setAnalysis] = useState(null);
//   const [analysis, setAnalysis] = useState({
//   roi: 0,
//   paybackPeriod: 0,
//   netBenefit: 0,
//   monthlyBenefit: 0,
//   totalCost: 0,
//   totalSavings: 0,
//   breakeven: true,
//   costBreakdown: { installation: 0, materials: 0, permits: 0 },
//   savingsBreakdown: { waterBills: 0, maintenance: 0, environmental: 0 },
// });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call and calculations
    setTimeout(() => {
      const initialCost = Number(projectData.initialCost)||50000;
      const annualMaintenance = Number(projectData.maintenance)||2000;
      const annualSavings = Number(projectData.waterSavings)||3000;
      const lifespan = Number(projectData.lifespan)||10;
console.log({ initialCost, annualMaintenance, annualSavings, lifespan });

      const totalCost = initialCost + (annualMaintenance * lifespan);
      const totalSavings = annualSavings * lifespan;
      const netBenefit = totalSavings - totalCost;
      const roi = ((netBenefit / totalCost) * 100);
      const paybackPeriod = initialCost / annualSavings;
      
      setAnalysis({
        initialCost,
        totalCost,
        totalSavings,
        netBenefit,
        roi,
        paybackPeriod: Math.round(paybackPeriod * 10) / 10,
        breakeven: paybackPeriod <= lifespan,
        monthlyBenefit: netBenefit / (lifespan * 12),
        costBreakdown: {
          installation: initialCost * 0.7,
          materials: initialCost * 0.2,
          permits: initialCost * 0.1
        },
        savingsBreakdown: {
          waterBills: annualSavings * 0.6,
          maintenance: annualSavings * 0.2,
          environmental: annualSavings * 0.2
        }
      });
      setIsLoading(false);
      console.log(analysis);
      console.log(projectData);
    }, 2000);

  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground mb-2">Cost-Benefit Analysis</h2>
        <p className="text-card-foreground/70">
          Comprehensive financial analysis of your rainwater harvesting investment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-card-foreground font-medium mb-2">
            System Type
          </label>
          <select
            value={projectData.systemType}
            onChange={(e) => setProjectData({ ...projectData, systemType: e.target.value })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            required
          >
            <option className='text-black font-semibold' value="">Select system type</option>
            <option className='text-black' value="basic">Basic Collection System</option>
            <option className='text-black' value="advanced">Advanced Filtration System</option>
            <option className='text-black' value="commercial">Commercial Grade System</option>
          </select>
        </div>

        <div>
          <label className="block text-card-foreground font-medium mb-2">
            <DollarSign className="inline w-4 h-4 mr-2" />
            Initial Investment (₹)
          </label>
          <input
            type="number"
            value={projectData.initialCost}
            onChange={(e) => setProjectData({ ...projectData, initialCost: Number(e.target.value) })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="e.g., 50000"
            required
          />
        </div>

        <div>
          <label className="block text-card-foreground font-medium mb-2">
            <Calculator className="inline w-4 h-4 mr-2" />
            Annual Maintenance (₹)
          </label>
          <input
            type="number"
            value={projectData.maintenance}
            onChange={(e) => setProjectData({ ...projectData, maintenance: Number(e.target.value) })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="e.g., 2000"
            required
          />
        </div>

        <div>
          <label className="block text-card-foreground font-medium mb-2">
            <TrendingUp className="inline w-4 h-4 mr-2" />
            Annual Water Savings (₹)
          </label>
          <input
            type="number"
            value={projectData.waterSavings}
            onChange={(e) => setProjectData({ ...projectData, waterSavings: Number(e.target.value) })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            placeholder="e.g., 8000"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-card-foreground font-medium mb-2">
            System Lifespan (years)
          </label>
          <select
            value={projectData.lifespan}
            onChange={(e) => setProjectData({ ...projectData, lifespan: Number(e.target.value) })}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            required
          >
            <option className='text-black text-xl' value="">Select expected lifespan</option>
            <option className='text-black' value="10">10 years</option>
            <option className='text-black' value="15">15 years</option>
            <option className='text-black' value="20">20 years</option>
            <option className='text-black' value="25">25 years</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Calculate Cost-Benefit Analysis
          </button>
        </div>
      </form>
      {analysis && (

      
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card/50 p-4 rounded-lg border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="font-medium text-card-foreground">ROI</span>
              </div>
              <div className={`text-2xl font-bold ${analysis.roi > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analysis.roi > 0 ? '+' : ''}{Math.round(analysis.roi)}%
              </div>
              <div className="text-sm text-card-foreground/70">Return on Investment</div>
            </div>

            <div className="bg-card/50 p-4 rounded-lg border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="font-medium text-card-foreground">Payback</span>
              </div>
              <div className="text-2xl font-bold text-card-foreground">{analysis.paybackPeriod}</div>
              <div className="text-sm text-card-foreground/70">Years</div>
            </div>

            <div className="bg-card/50 p-4 rounded-lg border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-green-600" />
                <span className="font-medium text-card-foreground">Net Benefit</span>
              </div>
              <div className={`text-2xl font-bold ${analysis.netBenefit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{Math.round(analysis.netBenefit).toLocaleString()}
              </div>
              <div className="text-sm text-card-foreground/70">
                {analysis.netBenefit > 0 ? 'Profit' : 'Loss'}
              </div>
            </div>

            <div className="bg-card/50 p-4 rounded-lg border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <PieChart className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-card-foreground">Monthly Benefit</span>
              </div>
              <div className={`text-2xl font-bold ${analysis.monthlyBenefit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{Math.abs(Math.round(analysis.monthlyBenefit)).toLocaleString()}
              </div>
              <div className="text-sm text-card-foreground/70">Per month</div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="p-6 bg-accent/10 border border-accent/30 rounded-lg">
            <h3 className="text-xl font-bold text-card-foreground mb-4">Financial Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-card-foreground mb-3">Investment Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-card-foreground/70">Installation:</span>
                    <span className="text-card-foreground">₹{Math.round(analysis.costBreakdown.installation).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-card-foreground/70">Materials:</span>
                    <span className="text-card-foreground">₹{Math.round(analysis.costBreakdown.materials).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-card-foreground/70">Permits & Others:</span>
                    <span className="text-card-foreground">₹{Math.round(analysis.costBreakdown.permits).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-border/30 pt-2 flex justify-between font-semibold">
                    <span className="text-card-foreground">Total Cost:</span>
                    <span className="text-card-foreground">₹{Math.round(analysis.totalCost).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-card-foreground mb-3">Savings Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-card-foreground/70">Water Bills:</span>
                    <span className="text-card-foreground">₹{Math.round(analysis.savingsBreakdown.waterBills * parseInt(projectData.lifespan)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-card-foreground/70">Maintenance Savings:</span>
                    <span className="text-card-foreground">₹{Math.round(analysis.savingsBreakdown.maintenance * parseInt(projectData.lifespan)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-card-foreground/70">Environmental Value:</span>
                    <span className="text-card-foreground">₹{Math.round(analysis.savingsBreakdown.environmental * parseInt(projectData.lifespan)).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-border/30 pt-2 flex justify-between font-semibold">
                    <span className="text-card-foreground">Total Savings:</span>
                    <span className="text-card-foreground">₹{Math.round(analysis.totalSavings).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className={`p-6 rounded-lg border ${
            analysis.breakeven 
              ? 'bg-blue-100 border-green-200 dark:bg-green-900/20 dark:border-green-800 text-black' 
              : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 text-black'
          }`}>
            <h3 className="text-xl font-bold text-card-foreground mb-3">
              {analysis.breakeven ? 'Recommended Investment' : 'Investment Warning'}
            </h3>
            <p className="text-card-foreground/80">
              {analysis.breakeven 
                ? `This rainwater harvesting system is financially viable with a payback period of ${analysis.paybackPeriod} years and a positive ROI of ${Math.round(analysis.roi)}%. You'll start seeing net benefits after the payback period.`
                : `This investment may not be financially optimal as the payback period (${analysis.paybackPeriod} years) exceeds the system lifespan. Consider reducing costs or increasing efficiency.`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostBenefitAnalysis;