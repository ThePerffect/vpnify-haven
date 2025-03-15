
import { motion } from "framer-motion";
import { Shield, Globe, Lock, Clock, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-vpn-green" />,
      title: "Bank-Level Security",
      description: "AES-256 encryption, the same standard used by financial institutions worldwide."
    },
    {
      icon: <Globe className="h-10 w-10 text-vpn-green" />,
      title: "Global Network",
      description: "1000+ servers in 60+ countries, ensuring a fast and reliable connection anywhere."
    },
    {
      icon: <Lock className="h-10 w-10 text-vpn-green" />,
      title: "No-Logs Policy",
      description: "We don't track, collect, or share any of your data or browsing history."
    },
    {
      icon: <Clock className="h-10 w-10 text-vpn-green" />,
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to assist you."
    },
    {
      icon: <Zap className="h-10 w-10 text-vpn-green" />,
      title: "Lightning Speed",
      description: "Optimized servers for streaming, gaming, and browsing without slowdowns."
    },
    {
      icon: <Award className="h-10 w-10 text-vpn-green" />,
      title: "Trusted By Millions",
      description: "Join the millions of users who trust us with their online privacy."
    }
  ];

  return (
    <div className="container py-12 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About SecureVPN</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Protecting your online privacy and security since 2015
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gradient">Our Mission</h2>
          <p className="text-lg mb-6">
            At SecureVPN, we believe that internet privacy is a fundamental right. Our mission is to provide everyone with 
            simple yet powerful tools to protect their digital life, maintain privacy, and access the content they love 
            without restrictions.
          </p>
          <p className="text-lg mb-6">
            Founded in 2015 by a team of cybersecurity experts, SecureVPN has grown from a small startup to one of the 
            most trusted VPN providers globally, serving millions of users across 190+ countries.
          </p>
          <Button size="lg" className="mt-4">Learn More</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-panel p-8 flex items-center justify-center"
        >
          <div className="relative w-full aspect-video">
            <div className="absolute inset-0 bg-gradient-to-r from-vpn-green/20 to-transparent rounded-lg flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-vpn-green/20 flex items-center justify-center cursor-pointer hover:bg-vpn-green/30 transition-colors">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Why Choose SecureVPN?</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We combine cutting-edge technology with user-friendly design to deliver the best VPN experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="glass-panel p-6"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="glass-panel-dark p-10 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Ready to secure your online presence?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join millions of users who trust SecureVPN for their privacy and security needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8">Get Started</Button>
          <Button size="lg" variant="outline" className="px-8">View Plans</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
