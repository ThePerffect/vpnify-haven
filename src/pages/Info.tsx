
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Globe, 
  Zap, 
  Lock, 
  Wifi, 
  Server, 
  ArrowRight,
  Map,
  CheckCircle,
  X,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import PromoCodeForm from '@/components/PromoCodeForm';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const InfoPage = () => {
  const [countries, setCountries] = useState(0);
  const [servers, setServers] = useState(0);
  const [users, setUsers] = useState(0);
  const [showChat, setShowChat] = useState(false);

  // Simulate counting animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCountries(prev => prev < 95 ? prev + 1 : prev);
      setServers(prev => prev < 320 ? prev + 5 : prev);
      setUsers(prev => prev < 1500000 ? prev + 25000 : prev);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Military-grade encryption keeps your data secure on any network."
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Bypass geo-restrictions and access content from anywhere."
    },
    {
      icon: Zap,
      title: "Blazing Speed",
      description: "Optimized servers provide the fastest connections possible."
    },
    {
      icon: Lock,
      title: "No Logs Policy",
      description: "Your activity is never monitored, tracked, or recorded."
    }
  ];

  const plans = [
    {
      name: "Basic",
      price: "$5.99",
      period: "per month",
      features: [
        "5 Simultaneous Connections",
        "Standard Servers Access",
        "Average Speeds",
        "Email Support"
      ],
      highlight: false,
      cta: "Get Started"
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      features: [
        "10 Simultaneous Connections",
        "Premium Servers Access",
        "Optimized Speeds",
        "24/7 Priority Support",
        "Ad Blocker Included"
      ],
      highlight: true,
      cta: "Get Pro",
      badge: "Most Popular"
    },
    {
      name: "Enterprise",
      price: "$15.99",
      period: "per month",
      features: [
        "Unlimited Connections",
        "All Server Locations",
        "Maximum Speeds",
        "Dedicated Support Team",
        "Advanced Security Features",
        "Custom Configuration"
      ],
      highlight: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 md:px-10 py-16 md:py-28 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl">
          <div className="absolute top-40 left-20 w-64 h-64 bg-vpn-green/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-vpn-green/10 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-vpn-green/15 rounded-full blur-[100px]"></div>
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>

        {/* Hero content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col lg:flex-row items-center justify-between gap-12"
          >
            {/* Left column - text content */}
            <motion.div variants={itemVariants} className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-vpn-green/10 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-vpn-green rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-vpn-green">VPN Protection Active</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Secure Your <span className="text-gradient">Digital Privacy</span> Anywhere
              </h1>
              
              <p className="text-white/70 text-lg md:text-xl mb-8">
                High-speed VPN service with military-grade encryption, global server network, and unlimited bandwidth.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start">
                <Button size="lg" className="bg-vpn-green hover:bg-vpn-green-dark text-black font-medium px-8">
                  Get Started
                </Button>
                
                <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/5">
                  View Plans
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-4 mt-10">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-2xl font-bold text-white mb-1">
                    <span>{countries}</span>+
                  </div>
                  <div className="text-sm text-white/60">Countries</div>
                </div>
                
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-2xl font-bold text-white mb-1">
                    <span>{servers}</span>+
                  </div>
                  <div className="text-sm text-white/60">Servers</div>
                </div>
                
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-2xl font-bold text-white mb-1">
                    <span>{(users / 1000000).toFixed(1)}M</span>+
                  </div>
                  <div className="text-sm text-white/60">Users</div>
                </div>
              </div>
            </motion.div>
            
            {/* Right column - image/illustration */}
            <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-vpn-green/30 to-blue-500/20 rounded-3xl blur-2xl -z-10 opacity-40"></div>
                <div className="glass-panel p-3 md:p-4 rounded-3xl relative">
                  <img 
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2934&auto=format&fit=crop" 
                    alt="VPN Security" 
                    className="w-full rounded-2xl h-[380px] md:h-[420px] object-cover"
                  />
                  <div className="absolute top-8 left-8 glass-panel-dark p-4 rounded-xl flex items-center gap-3 animate-slide-in opacity-0" style={{ animationDelay: '0.5s' }}>
                    <Lock className="text-vpn-green" />
                    <div className="text-sm">
                      <div className="font-medium">Connection Encrypted</div>
                      <div className="text-white/60 text-xs">AES-256 Protection</div>
                    </div>
                  </div>
                  <div className="absolute bottom-8 right-8 glass-panel-dark p-4 rounded-xl flex items-center gap-3 animate-slide-in opacity-0" style={{ animationDelay: '0.8s' }}>
                    <Server className="text-vpn-green" />
                    <div className="text-sm">
                      <div className="font-medium">Server Connected</div>
                      <div className="text-white/60 text-xs">Tokyo, Japan</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-10 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Features</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Our VPN service includes everything you need for secure, private browsing on any device.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-panel p-6 rounded-xl card-hover"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-vpn-green/10 rounded-lg mb-5">
                  <feature.icon className="w-6 h-6 text-vpn-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-6 md:px-10 py-20 relative">
        <div className="absolute top-40 right-0 w-64 h-64 bg-vpn-green/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-vpn-green/10 rounded-full blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Global Server Network</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Access our high-speed servers in over 95 countries with 99.9% uptime.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-panel p-6 md:p-10 rounded-2xl">
              <div className="relative">
                <Map className="w-full h-[300px] md:h-[400px] text-vpn-green/40" />
                <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-vpn-green rounded-full green-glow"></div>
                <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-vpn-green rounded-full green-glow"></div>
                <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-vpn-green rounded-full green-glow"></div>
                <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-vpn-green rounded-full green-glow"></div>
                <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-vpn-green rounded-full green-glow"></div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-vpn-black/50 rounded-full text-sm text-white/80">
                  <div className="w-2 h-2 bg-vpn-green rounded-full"></div>
                  Tokyo
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-vpn-black/50 rounded-full text-sm text-white/80">
                  <div className="w-2 h-2 bg-vpn-green rounded-full"></div>
                  New York
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-vpn-black/50 rounded-full text-sm text-white/80">
                  <div className="w-2 h-2 bg-vpn-green rounded-full"></div>
                  London
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-vpn-black/50 rounded-full text-sm text-white/80">
                  <div className="w-2 h-2 bg-vpn-green rounded-full"></div>
                  Sydney
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-vpn-black/50 rounded-full text-sm text-white/80">
                  <div className="w-2 h-2 bg-vpn-green rounded-full"></div>
                  Frankfurt
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 md:px-10 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Select the perfect VPN plan for your needs with our flexible pricing options.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`glass-panel p-6 rounded-xl card-hover relative ${
                  plan.highlight ? 'border-vpn-green/50 bg-gradient-to-b from-vpn-green/10 to-transparent' : ''
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-vpn-green text-black px-4 py-1 rounded-full text-xs font-medium">
                    {plan.badge}
                  </div>
                )}
                
                <h3 className="text-xl font-semibold mb-1 mt-4">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-white/60 mb-1">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-vpn-green shrink-0 mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.highlight 
                      ? 'bg-vpn-green hover:bg-vpn-green-dark text-black' 
                      : 'bg-white/10 hover:bg-white/15 text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Code Section */}
      <section className="px-6 md:px-10 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-panel p-8 md:p-10 rounded-2xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Have a Promo Code?</h2>
          <p className="text-white/70 text-center mb-8">
            Enter your promotional code to receive a special discount on your VPN subscription.
          </p>
          
          <PromoCodeForm />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-10 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-vpn-green/10 to-blue-900/10"></div>
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-panel p-10 md:p-16 rounded-2xl text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Connection?</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Join millions of users who trust VPNify for online privacy and security.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-vpn-green hover:bg-vpn-green-dark text-black font-medium px-8">
                Get Started Now
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/5">
                View All Features
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setShowChat(!showChat)}
          className="w-12 h-12 rounded-full bg-vpn-green text-black p-0 flex items-center justify-center"
        >
          {showChat ? <X /> : <MessageSquare />}
        </Button>
        
        {showChat && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute bottom-16 right-0 w-80 glass-panel rounded-xl p-4"
          >
            <div className="mb-4">
              <h3 className="font-medium mb-1">Customer Support</h3>
              <p className="text-white/70 text-sm">How can we help you today?</p>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                className="bg-vpn-black-light border border-white/10 rounded-lg px-3 py-2 text-sm flex-1" 
                placeholder="Type your message..."
              />
              <Button size="sm" className="bg-vpn-green text-black">
                Send
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InfoPage;
