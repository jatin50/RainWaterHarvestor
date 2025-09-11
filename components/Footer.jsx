import { Droplets, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-card-foreground">AquaWise</span>
            </div>
            <p className="text-card-foreground/70 mb-4">
              Smart Rainwater Harvesting & RTRWH Solutions for sustainable water management. 
              Empowering communities through data-driven water conservation strategies.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-card-foreground/70">
              <li><a href="/dashboard" className="hover:text-primary transition-colors">Dashboard</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Contact Info</h3>
            <ul className="space-y-3 text-card-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@aquawise.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 12345 67890
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Smart India Hackathon
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-8 pt-6 text-center">
          <p className="text-card-foreground/60">
            © 2025 AquaWise. Built for Smart India Hackathon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;