
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, User, CreditCard, Settings, History, ChevronDown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

const Account = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  const sections = [
    { id: "profile", icon: <User className="h-5 w-5" />, title: "Profile Information" },
    { id: "subscription", icon: <Shield className="h-5 w-5" />, title: "Current Plan" },
    { id: "billing", icon: <CreditCard className="h-5 w-5" />, title: "Payment Methods" },
    { id: "history", icon: <History className="h-5 w-5" />, title: "Usage History" },
    { id: "settings", icon: <Settings className="h-5 w-5" />, title: "Settings" },
  ];

  return (
    <div className="container py-6 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center gap-3 mb-4 bg-[#1E1E1E] p-4 rounded-lg">
          <div className="h-12 w-12 rounded-full bg-vpn-green/20 flex items-center justify-center">
            <User className="h-6 w-6 text-vpn-green" />
          </div>
          <div>
            <h1 className="text-xl font-bold">@JohnDoe</h1>
            <p className="text-sm text-gray-400">Premium Subscriber</p>
          </div>
        </div>

        {sections.map((section) => (
          <Card key={section.id} className="border-none shadow-none bg-[#1E1E1E] overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer" 
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center gap-3">
                <div className="text-vpn-green">{section.icon}</div>
                <h3 className="font-medium">{section.title}</h3>
              </div>
              {activeSection === section.id ? 
                <ChevronDown className="h-5 w-5 text-gray-400" /> : 
                <ChevronRight className="h-5 w-5 text-gray-400" />
              }
            </div>

            {activeSection === section.id && (
              <CardContent className="pt-0 pb-4 px-4 border-t border-gray-800">
                {section.id === "profile" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Full Name</label>
                      <input 
                        type="text" 
                        value="John Doe" 
                        className="w-full px-3 py-2 bg-[#2A2A2A] rounded text-white border-none focus:ring-1 focus:ring-vpn-green" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Username</label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">@</span>
                        <input 
                          type="text" 
                          value="JohnDoe" 
                          className="w-full px-3 py-2 bg-[#2A2A2A] rounded text-white border-none focus:ring-1 focus:ring-vpn-green" 
                        />
                      </div>
                    </div>
                    <Button className="w-full bg-vpn-green hover:bg-vpn-green-dark text-black">Save Changes</Button>
                  </div>
                )}

                {section.id === "subscription" && (
                  <div className="space-y-4">
                    <div className="bg-[#2A2A2A] p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-vpn-green">Premium Plan</h4>
                        <span className="text-sm bg-vpn-green/20 text-vpn-green px-2 py-1 rounded">Active</span>
                      </div>
                      <div className="text-xl font-bold mb-2">$9.99<span className="text-sm text-gray-400">/month</span></div>
                      <div className="text-sm text-gray-400 mb-3">Next billing: June 12, 2023</div>
                      <Progress value={65} className="h-2 bg-[#333333]" />
                      <div className="text-xs text-gray-400 mt-1">19 days remaining</div>
                    </div>
                    <Button variant="outline" className="w-full border-vpn-green text-vpn-green hover:bg-vpn-green/10">
                      Change Plan
                    </Button>
                  </div>
                )}

                {section.id === "billing" && (
                  <div className="space-y-4">
                    <div className="p-3 bg-[#2A2A2A] rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-vpn-green" />
                        <div>
                          <div className="text-sm">Visa •••• 4242</div>
                          <div className="text-xs text-gray-400">Expires 12/2025</div>
                        </div>
                      </div>
                      <div className="w-4 h-4 rounded-full border border-vpn-green flex items-center justify-center">
                        <div className="w-2 h-2 bg-vpn-green rounded-full"></div>
                      </div>
                    </div>
                    <Button className="w-full bg-[#2A2A2A] hover:bg-[#333333] text-white">
                      Add Payment Method
                    </Button>
                  </div>
                )}

                {section.id === "history" && (
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
                )}

                {section.id === "settings" && (
                  <div className="space-y-4">
                    <RadioGroup defaultValue="all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="space-y-0.5">
                          <h4 className="text-sm">Email Notifications</h4>
                          <p className="text-xs text-gray-400">Receive email about account</p>
                        </div>
                        <RadioGroupItem value="all" id="notifications" className="text-vpn-green" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="text-sm">Auto-Connect VPN</h4>
                          <p className="text-xs text-gray-400">Connect to VPN on startup</p>
                        </div>
                        <RadioGroupItem value="auto" id="auto-connect" className="text-vpn-green" />
                      </div>
                    </RadioGroup>
                    
                    <Button className="w-full bg-[#2A2A2A] hover:bg-[#333333]">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default Account;
