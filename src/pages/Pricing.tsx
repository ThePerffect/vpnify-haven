
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  ArrowRight, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  Wifi, 
  Globe,
  HelpCircle,
  DownloadCloud,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import PromoCodeForm from '@/components/PromoCodeForm';

interface Plan {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  description: string;
  features: {
    title: string;
    included: boolean;
  }[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    monthly: 5.99,
    yearly: 59.88,
    description: 'Essential protection for casual browsing',
    features: [
      { title: '5 Simultaneous Connections', included: true },
      { title: 'Standard VPN Speeds', included: true },
      { title: 'Access to 30+ Countries', included: true },
      { title: 'No Bandwidth Limits', included: true },
      { title: 'Ad Blocker', included: false },
      { title: 'Advanced Security Features', included: false },
      { title: 'Premium Server Locations', included: false },
      { title: '24/7 Priority Support', included: false }
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 9.99,
    yearly: 99.96,
    description: 'Advanced protection with extra features',
    popular: true,
    features: [
      { title: '10 Simultaneous Connections', included: true },
      { title: 'High VPN Speeds', included: true },
      { title: 'Access to 60+ Countries', included: true },
      { title: 'No Bandwidth Limits', included: true },
      { title: 'Ad Blocker', included: true },
      { title: 'Advanced Security Features', included: true },
      { title: 'Premium Server Locations', included: false },
      { title: '24/7 Priority Support', included: false }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: 15.99,
    yearly: 159.96,
    description: 'Ultimate protection for power users',
    features: [
      { title: 'Unlimited Simultaneous Connections', included: true },
      { title: 'Maximum VPN Speeds', included: true },
      { title: 'Access to 95+ Countries', included: true },
      { title: 'No Bandwidth Limits', included: true },
      { title: 'Ad Blocker', included: true },
      { title: 'Advanced Security Features', included: true },
      { title: 'Premium Server Locations', included: true },
      { title: '24/7 Priority Support', included: true }
    ]
  }
];

const faqs = [
  {
    question: 'How does the VPN service work?',
    answer: 'Our VPN creates an encrypted tunnel between your device and our secure servers, masking your IP address and encrypting your internet traffic. This protects your privacy and allows you to access content securely from anywhere.'
  },
  {
    question: 'Can I use the VPN on multiple devices?',
    answer: 'Yes, depending on your subscription plan, you can use our VPN on multiple devices simultaneously. The Basic plan supports up to 5 devices, Pro supports 10 devices, and Enterprise offers unlimited device connections.'
  },
  {
    question: 'Is my browsing activity logged?',
    answer: 'No, we maintain a strict no-logs policy. We do not monitor, record, or store your browsing history, traffic destination, data content, or DNS queries. Your privacy is our top priority.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. For monthly subscriptions, service continues until the end of the current billing cycle. For annual subscriptions, you can request a prorated refund within the first 30 days.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, cryptocurrency (Bitcoin, Ethereum), and various regional payment methods. All transactions are secured with industry-standard encryption.'
  }
];

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleSubscribe = (planId: string) => {
    toast.success(`Subscription initiated for ${planId} plan`);
    // In a real app, this would redirect to a checkout page
  };

  return (
    <div className="px-6 md:px-10 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Choose the perfect plan for your needs. All plans include our core VPN protection.
        </p>
      </motion.div>

      {/* Billing toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex justify-center mb-12"
      >
        <div className="glass-panel p-2 rounded-full inline-flex">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-vpn-green text-black'
                : 'text-white hover:bg-white/5'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              billingCycle === 'yearly'
                ? 'bg-vpn-green text-black'
                : 'text-white hover:bg-white/5'
            }`}
          >
            Yearly
            <span className="ml-2 text-xs bg-vpn-green/20 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </motion.div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            className={`glass-panel p-6 rounded-xl relative card-hover ${
              plan.popular ? 'border-vpn-green/50 bg-gradient-to-b from-vpn-green/10 to-transparent' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-vpn-green text-black px-4 py-1 rounded-full text-xs font-medium">
                Most Popular
              </div>
            )}

            <div className="mb-6 pt-4">
              <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
              <p className="text-white/60 mb-4 min-h-[40px]">{plan.description}</p>
              
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold">
                  ${billingCycle === 'monthly' ? plan.monthly : (plan.yearly / 12).toFixed(2)}
                </span>
                <span className="text-white/60">/ month</span>
              </div>
              
              {billingCycle === 'yearly' && (
                <div className="text-sm bg-vpn-green/10 text-vpn-green rounded-lg py-1.5 px-3 mb-4 inline-block">
                  ${(plan.monthly * 12 - plan.yearly).toFixed(2)} saved yearly
                </div>
              )}
              
              <Button 
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-vpn-green hover:bg-vpn-green-dark text-black' 
                    : 'bg-white/10 hover:bg-white/15 text-white'
                }`}
              >
                Subscribe Now
              </Button>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <div className="text-sm font-medium mb-3">Plan includes:</div>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-vpn-green shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? 'text-white/80' : 'text-white/40'}>
                      {feature.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Promo Code Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="glass-panel p-8 md:p-10 rounded-2xl mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Have a Promo Code?</h2>
        <p className="text-white/70 text-center mb-8">
          Enter your promotional code to receive a special discount on your VPN subscription.
        </p>
        
        <PromoCodeForm />
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Why Choose Our VPN?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass-panel p-6 rounded-xl">
            <div className="w-12 h-12 flex items-center justify-center bg-vpn-green/10 rounded-lg mb-5">
              <ShieldCheck className="w-6 h-6 text-vpn-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ultimate Privacy</h3>
            <p className="text-white/70">
              Advanced encryption and strict no-logs policy to protect your data.
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-xl">
            <div className="w-12 h-12 flex items-center justify-center bg-vpn-green/10 rounded-lg mb-5">
              <Zap className="w-6 h-6 text-vpn-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-white/70">
              Optimized servers for maximum speed and minimal latency.
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-xl">
            <div className="w-12 h-12 flex items-center justify-center bg-vpn-green/10 rounded-lg mb-5">
              <Globe className="w-6 h-6 text-vpn-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Access</h3>
            <p className="text-white/70">
              Connect to servers in 95+ countries to access content anywhere.
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-xl">
            <div className="w-12 h-12 flex items-center justify-center bg-vpn-green/10 rounded-lg mb-5">
              <DownloadCloud className="w-6 h-6 text-vpn-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-white/70">
              Simple one-click connection on all your devices.
            </p>
          </div>
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="glass-panel p-6 rounded-xl mb-4 cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="shrink-0 text-white/70 hover:text-white hover:bg-white/5"
                >
                  {expandedFaq === index ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <HelpCircle className="w-5 h-5" />
                  )}
                </Button>
              </div>
              
              {expandedFaq === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <p className="text-white/70">{faq.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <div className="glass-panel p-10 md:p-16 rounded-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to secure your connection?</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Join millions of users who trust our VPN for online privacy and security.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-vpn-green hover:bg-vpn-green-dark text-black font-medium px-8">
              Get Started Now
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/5">
              Contact Sales
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
