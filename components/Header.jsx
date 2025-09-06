import { Link, useNavigate } from 'react-router-dom';
import { Droplets, LogOut, User } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens
    navigate('/login');
  };

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Droplets className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-card-foreground">AquaWise</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/dashboard" 
            className="text-card-foreground hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            to="/about" 
            className="text-card-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-card-foreground">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Welcome, User</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;