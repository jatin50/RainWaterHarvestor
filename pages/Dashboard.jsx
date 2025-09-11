import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeasibilityForm from '../components/FeasibilityForm';
import ToxicityPrediction from '../components/ToxicityPrediction';
import AquiferInfo from '../components/AquiferInfo';
import RainfallData from '../components/RainfallData';
import RechargeStructureSuggestion from '../components/RechargeStructureSuggestion';
import CostBenefitAnalysis from '../components/CostBenefitAnalysis';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('feasibility');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'feasibility', label: 'Feasibility Assessment', component: FeasibilityForm },
    { id: 'toxicity', label: 'Water Quality', component: ToxicityPrediction },
    { id: 'aquifer', label: 'Aquifer Info', component: AquiferInfo },
    { id: 'rainfall', label: 'Rainfall Data', component: RainfallData },
    { id: 'structures', label: 'RTRWH Structures', component: RechargeStructureSuggestion },
    { id: 'analysis', label: 'Cost Analysis', component: CostBenefitAnalysis },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/15 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Complete rainwater harvesting feasibility assessment and analysis
          </p>
        </div>

        {/* Tab Navigation */}
        <div className=" bg-blue-100 text-blue-900 bg-card/70 backdrop-blur-sm rounded-lg border border-border/50 mb-6 p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-card-foreground hover:bg-accent/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="  bg-card/70 backdrop-blur-sm rounded-lg border border-border/50 p-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            ActiveComponent && <ActiveComponent setIsLoading={setIsLoading} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;