
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Server, 
  Clock, 
  Download, 
  Upload, 
  Globe, 
  Wifi, 
  BarChart4,
  ChevronRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [dataUsed, setDataUsed] = useState(0);
  const [isConnected, setIsConnected] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [serverLoad, setServerLoad] = useState(45);

  // Simulate data usage increasing over time
  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) {
        setDataUsed(prev => {
          const newValue = prev + Math.random() * 0.5;
          return newValue > 100 ? 100 : newValue;
        });
        
        setElapsedTime(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected]);

  // Format elapsed time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle VPN connection
  const toggleConnection = () => {
    setIsConnected(prev => !prev);
  };

  return (
    <div className="container py-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, @JohnDoe!</h1>
        <p className="text-white/70">Your VPN protection status and usage dashboard</p>
      </motion.div>

      {/* Connection Status Card */}
      <Card className="border-none shadow-none bg-[#1E1E1E] mb-6 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-full ${isConnected ? 'bg-vpn-green/20' : 'bg-red-500/20'} flex items-center justify-center`}>
                <Shield className={`h-6 w-6 ${isConnected ? 'text-vpn-green' : 'text-red-500'}`} />
              </div>
              <div>
                <h2 className="text-xl font-bold">{isConnected ? 'Protected' : 'Not Protected'}</h2>
                <p className="text-sm text-gray-400">{isConnected ? 'Your connection is secure' : 'Your connection is not secure'}</p>
              </div>
            </div>
            <Button 
              onClick={toggleConnection}
              className={isConnected ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-vpn-green hover:bg-vpn-green-dark text-black'}
            >
              {isConnected ? 'Disconnect' : 'Connect Now'}
            </Button>
          </div>

          {isConnected && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-[#2A2A2A] p-4 rounded-lg flex items-center gap-3">
                <Server className="text-vpn-green h-6 w-6" />
                <div>
                  <div className="text-sm text-gray-400">Server</div>
                  <div className="font-medium">Tokyo, Japan</div>
                </div>
              </div>
              <div className="bg-[#2A2A2A] p-4 rounded-lg flex items-center gap-3">
                <Clock className="text-vpn-green h-6 w-6" />
                <div>
                  <div className="text-sm text-gray-400">Connected Time</div>
                  <div className="font-medium">{formatTime(elapsedTime)}</div>
                </div>
              </div>
              <div className="bg-[#2A2A2A] p-4 rounded-lg flex items-center gap-3">
                <Wifi className="text-vpn-green h-6 w-6" />
                <div>
                  <div className="text-sm text-gray-400">Protocol</div>
                  <div className="font-medium">UDP / 443</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Data Usage Card */}
      <Card className="border-none shadow-none bg-[#1E1E1E] mb-6 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Data Usage</h3>
            <div className="text-sm text-gray-400">
              <span className="text-vpn-green font-medium">{dataUsed.toFixed(2)} GB</span> / 100 GB
            </div>
          </div>
          <Progress value={dataUsed} className="h-2 mb-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#2A2A2A] p-4 rounded-lg flex items-center gap-3">
              <Download className="text-vpn-green h-6 w-6" />
              <div>
                <div className="text-sm text-gray-400">Download</div>
                <div className="font-medium">{(dataUsed * 0.7).toFixed(2)} GB</div>
              </div>
            </div>
            <div className="bg-[#2A2A2A] p-4 rounded-lg flex items-center gap-3">
              <Upload className="text-vpn-green h-6 w-6" />
              <div>
                <div className="text-sm text-gray-400">Upload</div>
                <div className="font-medium">{(dataUsed * 0.3).toFixed(2)} GB</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border-none shadow-none bg-[#1E1E1E] overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Server Network</h3>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Server className="text-vpn-green h-5 w-5" />
                <span>320+ Servers</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="text-vpn-green h-5 w-5" />
                <span>95+ Countries</span>
              </div>
            </div>
            <Progress value={serverLoad} className="h-2 mb-2" />
            <div className="text-sm text-gray-400 flex justify-between">
              <span>Server Load: {serverLoad}%</span>
              <Link to="/servers" className="text-vpn-green flex items-center gap-1">
                View Status <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Card>

        <Card className="border-none shadow-none bg-[#1E1E1E] overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Subscription Plan</h3>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-vpn-green">Premium Plan</h4>
              <span className="text-sm bg-vpn-green/20 text-vpn-green px-2 py-1 rounded">Active</span>
            </div>
            <div className="text-xl font-bold mb-2">$9.99<span className="text-sm text-gray-400">/month</span></div>
            <div className="text-sm text-gray-400 mb-3">Next billing: June 12, 2023</div>
            <Progress value={65} className="h-2 bg-[#333333] mb-2" />
            <div className="text-sm text-gray-400 flex justify-between">
              <span>19 days remaining</span>
              <Link to="/account" className="text-vpn-green flex items-center gap-1">
                Manage <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-none shadow-none bg-[#1E1E1E] overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Recent Activity</h3>
            <Link to="/account" className="text-vpn-green text-sm flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 bg-[#2A2A2A] rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-sm">Session #{i}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(Date.now() - 1000 * 60 * 60 * 24 * i).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{Math.floor(Math.random() * 500) + 100} MB</div>
                  <div className="text-xs text-gray-400">
                    {Math.floor(Math.random() * 120) + 30} min
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
