
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, User, CreditCard, Settings, History } from "lucide-react";
import { motion } from "framer-motion";

const Account = () => {
  return (
    <div className="container py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-full bg-vpn-green/20 flex items-center justify-center">
            <User className="h-8 w-8 text-vpn-green" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground">Manage your account settings and subscription</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="subscription" className="gap-2">
              <Shield className="h-4 w-4" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              Usage History
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input type="text" value="John Doe" className="w-full px-3 py-2 bg-secondary rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input type="email" value="john.doe@example.com" className="w-full px-3 py-2 bg-secondary rounded-md" readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Username</label>
                    <input type="text" value="johndoe" className="w-full px-3 py-2 bg-secondary rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <input type="password" value="********" className="w-full px-3 py-2 bg-secondary rounded-md" readOnly />
                    <button className="text-sm text-vpn-green">Change Password</button>
                  </div>
                </div>
                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You are currently on the Premium plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="glass-panel p-6 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gradient">Premium Plan</h3>
                      <p className="text-muted-foreground">Billed monthly</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">$9.99<span className="text-sm text-muted-foreground">/month</span></div>
                      <div className="text-sm text-vpn-green">Active</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-vpn-green/20">
                    <div className="flex justify-between items-center">
                      <div>Next billing date</div>
                      <div>June 12, 2023</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="destructive">Cancel Subscription</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-10 w-10 text-vpn-green" />
                      <div>
                        <div className="font-medium">Visa ending in 4242</div>
                        <div className="text-sm text-muted-foreground">Expires 12/2025</div>
                      </div>
                    </div>
                    <div>
                      <Button variant="ghost" size="sm">Remove</Button>
                      <Button size="sm" className="ml-2">Default</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Add Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Usage History</CardTitle>
                <CardDescription>Track your VPN usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 bg-secondary rounded-lg flex items-center justify-between">
                      <div>
                        <div className="font-medium">Session #{i}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(Date.now() - 1000 * 60 * 60 * 24 * i).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div>{Math.floor(Math.random() * 500) + 100} MB</div>
                        <div className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 120) + 30} minutes
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive email about account activities</p>
                    </div>
                    <div className="flex h-5 items-center">
                      <input
                        id="notifications"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-vpn-green focus:ring-vpn-green"
                        defaultChecked
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button size="sm" variant="outline">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Auto-Connect VPN</h3>
                      <p className="text-sm text-muted-foreground">Connect to VPN automatically on startup</p>
                    </div>
                    <div className="flex h-5 items-center">
                      <input
                        id="auto-connect"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-vpn-green focus:ring-vpn-green"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Account;
