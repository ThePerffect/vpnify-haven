
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Activity, CreditCard, User, Menu, X, Globe, ChevronDown, Info, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const getNavLinks = (isLoggedIn: boolean) => {
  // Base links for all users
  const links = [
    { name: 'Info', path: '/info', icon: Info },
    { name: 'Server Status', path: '/servers', icon: Activity },
    { name: 'Pricing', path: '/pricing', icon: CreditCard },
  ];
  
  // Add links for logged in users
  if (isLoggedIn) {
    links.unshift({ name: 'Dashboard', path: '/', icon: Shield });
    links.push({ name: 'Account', path: '/account', icon: User });
  }
  
  return links;
};

const MainLayout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, login, logout } = useAuth();
  
  const navLinks = getNavLinks(isLoggedIn);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    out: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-vpn-black">
      {/* Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-10 py-4",
          isScrolled ? "bg-vpn-black/90 backdrop-blur-lg border-b border-vpn-green/10" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to={isLoggedIn ? "/" : "/info"} className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-vpn-green/30 rounded-full blur-lg"></div>
              <Shield className="w-8 h-8 text-vpn-green relative" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">VPNify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium",
                  location.pathname === link.path
                    ? "text-vpn-green bg-vpn-green/10"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Language Selector and Auth Button (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1 text-white/80 hover:text-white">
              <Globe className="w-4 h-4" />
              <span>EN</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            <div className="w-px h-6 bg-white/10"></div>
            
            {isLoggedIn ? (
              <Button 
                onClick={logout}
                className="flex items-center gap-1 bg-white/10 hover:bg-white/15 text-white"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Button 
                onClick={login}
                className="bg-vpn-green hover:bg-vpn-green-dark text-black font-medium"
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-vpn-black-light backdrop-blur-lg border-b border-vpn-green/10 md:hidden"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-3 rounded-lg transition-all flex items-center gap-3",
                    location.pathname === link.path
                      ? "text-vpn-green bg-vpn-green/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 mt-4">
                {isLoggedIn ? (
                  <Button 
                    onClick={logout}
                    className="w-full bg-white/10 hover:bg-white/15 text-white justify-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button 
                    onClick={login}
                    className="w-full bg-vpn-green hover:bg-vpn-green-dark text-black font-medium justify-center"
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="min-h-[calc(100vh-80px)]"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-vpn-black-light border-t border-vpn-green/10 py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link to={isLoggedIn ? "/" : "/info"} className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-vpn-green" />
                <span className="text-lg font-bold text-white">VPNify</span>
              </Link>
              <p className="text-white/60 text-sm">
                Secure, reliable VPN service with global coverage and unmatched performance.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-4">Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path}
                      className="text-white/60 hover:text-vpn-green transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-4">Contact</h3>
              <p className="text-white/60 text-sm mb-2">support@vpnify.com</p>
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} VPNify. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
