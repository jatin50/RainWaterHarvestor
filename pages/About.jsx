import { Link } from 'react-router-dom';
import { Droplets, Target, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/30">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Droplets className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">About AquaWise</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing water conservation through intelligent rainwater harvesting solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-card/70 backdrop-blur-sm p-8 rounded-lg border border-border/50">
            <h2 className="text-3xl font-bold text-card-foreground mb-6">Our Mission</h2>
            <p className="text-card-foreground/80 text-lg leading-relaxed">
              To empower communities and individuals with data-driven insights for effective 
              rainwater harvesting and groundwater recharge. We combine advanced technology 
              with environmental science to make water conservation accessible and efficient.
            </p>
          </div>

          <div className="bg-card/70 backdrop-blur-sm p-8 rounded-lg border border-border/50">
            <h2 className="text-3xl font-bold text-card-foreground mb-6">Why Choose Us</h2>
            <ul className="space-y-3 text-card-foreground/80 text-lg">
              <li className="flex items-center gap-3">
                <Target className="w-5 h-5 text-primary" />
                Accurate feasibility analysis
              </li>
              <li className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                Expert recommendations
              </li>
              <li className="flex items-center gap-3">
                <Award className="w-5 h-5 text-primary" />
                Proven cost-effective solutions
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-card/70 backdrop-blur-sm p-8 rounded-lg border border-border/50 mb-12">
          <h2 className="text-3xl font-bold text-card-foreground mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Feasibility Assessment</h3>
              <p className="text-card-foreground/70">
                Comprehensive analysis based on location, rainfall data, and property characteristics
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">RTRWH Design</h3>
              <p className="text-card-foreground/70">
                Customized recharge structure recommendations with precise dimensions
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Cost Analysis</h3>
              <p className="text-card-foreground/70">
                Detailed cost-benefit analysis with ROI calculations and payback periods
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            to="/login"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Your Assessment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;