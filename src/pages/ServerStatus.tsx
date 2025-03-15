
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Map, 
  Globe, 
  Wifi, 
  Check, 
  AlertTriangle, 
  Search, 
  SlidersHorizontal,
  RefreshCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Server status types
type ServerStatus = 'online' | 'offline' | 'maintenance';

interface ServerLocation {
  id: string;
  name: string;
  country: string;
  region: string;
  status: ServerStatus;
  ping: number;
  load: number;
  lastUpdated: Date;
}

// Mock server data
const generateMockServers = (): ServerLocation[] => {
  const regions = ['Europe', 'North America', 'Asia', 'South America', 'Oceania'];
  const countries = [
    { name: 'United States', cities: ['New York', 'Los Angeles', 'Chicago', 'Miami'] },
    { name: 'United Kingdom', cities: ['London', 'Manchester', 'Edinburgh'] },
    { name: 'Japan', cities: ['Tokyo', 'Osaka', 'Kyoto'] },
    { name: 'Germany', cities: ['Berlin', 'Frankfurt', 'Munich'] },
    { name: 'France', cities: ['Paris', 'Lyon', 'Marseille'] },
    { name: 'Canada', cities: ['Toronto', 'Vancouver', 'Montreal'] },
    { name: 'Australia', cities: ['Sydney', 'Melbourne', 'Perth'] },
    { name: 'Brazil', cities: ['São Paulo', 'Rio de Janeiro', 'Brasília'] },
    { name: 'Singapore', cities: ['Singapore City'] },
    { name: 'Netherlands', cities: ['Amsterdam', 'Rotterdam'] },
  ];
  
  const servers: ServerLocation[] = [];
  
  countries.forEach(country => {
    const region = regions[Math.floor(Math.random() * regions.length)];
    
    country.cities.forEach(city => {
      // Generate 1-3 servers per city
      const serverCount = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 1; i <= serverCount; i++) {
        const status: ServerStatus = Math.random() > 0.85 
          ? (Math.random() > 0.5 ? 'maintenance' : 'offline') 
          : 'online';
          
        const ping = status === 'online' ? Math.floor(Math.random() * 100) + 10 : 0;
        const load = status === 'online' ? Math.floor(Math.random() * 80) + 10 : 0;
        
        servers.push({
          id: `${country.name}-${city}-${i}`.toLowerCase().replace(/\s+/g, '-'),
          name: `${city} ${i > 1 ? i : ''}`,
          country: country.name,
          region,
          status,
          ping,
          load,
          lastUpdated: new Date(Date.now() - Math.random() * 3600000)
        });
      }
    });
  });
  
  return servers;
};

const ServerStatus: React.FC = () => {
  const [servers, setServers] = useState<ServerLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ServerStatus | null>(null);
  
  // Load mock data
  useEffect(() => {
    const fetchServers = () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setServers(generateMockServers());
        setLoading(false);
      }, 1500);
    };
    
    fetchServers();
  }, []);
  
  // Filter servers based on search and filters
  const filteredServers = servers.filter(server => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Region filter
    const matchesRegion = selectedRegion === null || server.region === selectedRegion;
    
    // Status filter
    const matchesStatus = selectedStatus === null || server.status === selectedStatus;
    
    return matchesSearch && matchesRegion && matchesStatus;
  });
  
  // Get unique regions for filter
  const regions = [...new Set(servers.map(server => server.region))];
  
  // Server status counts
  const onlineCount = servers.filter(server => server.status === 'online').length;
  const maintenanceCount = servers.filter(server => server.status === 'maintenance').length;
  const offlineCount = servers.filter(server => server.status === 'offline').length;
  
  // Refresh servers data
  const handleRefresh = () => {
    setLoading(true);
    toast.info("Refreshing server status...");
    
    // Simulate API call
    setTimeout(() => {
      setServers(generateMockServers());
      setLoading(false);
      toast.success("Server status updated");
    }, 1500);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion(null);
    setSelectedStatus(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="px-6 md:px-10 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Server Status</h1>
        <p className="text-white/70">
          Monitor our global server network status in real-time. All times are displayed in your local timezone.
        </p>
      </motion.div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-panel p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-vpn-green/10 flex items-center justify-center">
              <Check className="text-vpn-green w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-white/60">Online Servers</div>
              <div className="text-2xl font-bold">{onlineCount}</div>
            </div>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-vpn-green h-full rounded-full" 
              style={{ width: `${(onlineCount / servers.length) * 100}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-panel p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <AlertTriangle className="text-yellow-500 w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-white/60">Maintenance</div>
              <div className="text-2xl font-bold">{maintenanceCount}</div>
            </div>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-yellow-500 h-full rounded-full" 
              style={{ width: `${(maintenanceCount / servers.length) * 100}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-panel p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Wifi className="text-red-500 w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-white/60">Offline</div>
              <div className="text-2xl font-bold">{offlineCount}</div>
            </div>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-red-500 h-full rounded-full" 
              style={{ width: `${(offlineCount / servers.length) * 100}%` }}
            ></div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="glass-panel p-6 rounded-xl mb-8"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search servers by name or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-vpn-black border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-white/40 focus:border-vpn-green/50 outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Region Filter */}
            <select
              value={selectedRegion || ''}
              onChange={(e) => setSelectedRegion(e.target.value || null)}
              className="bg-vpn-black border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-vpn-green/50 min-w-[180px]"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus || ''}
              onChange={(e) => setSelectedStatus(e.target.value as ServerStatus || null)}
              className="bg-vpn-black border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-vpn-green/50 min-w-[180px]"
            >
              <option value="">All Status</option>
              <option value="online">Online</option>
              <option value="maintenance">Maintenance</option>
              <option value="offline">Offline</option>
            </select>

            {/* Button group */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="border-white/10 text-white hover:bg-white/5"
                onClick={resetFilters}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Reset
              </Button>
              
              <Button 
                onClick={handleRefresh}
                className="bg-vpn-green hover:bg-vpn-green-dark text-black"
                disabled={loading}
              >
                <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Server List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-vpn-green/30 border-t-vpn-green rounded-full animate-spin mb-4"></div>
          <p className="text-white/70">Loading server data...</p>
        </div>
      ) : (
        <>
          <p className="text-white/60 mb-6">
            Showing {filteredServers.length} of {servers.length} servers
          </p>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredServers.length > 0 ? (
              filteredServers.map(server => (
                <motion.div 
                  key={server.id}
                  variants={itemVariants}
                  className="glass-panel p-6 rounded-xl card-hover"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{server.name}</h3>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-white/60" />
                        <span className="text-white/80 text-sm">{server.country}</span>
                      </div>
                    </div>
                    
                    <div className={`server-ping ${server.status}`}>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                        server.status === 'online' 
                          ? 'bg-vpn-green/20 text-vpn-green' 
                          : server.status === 'maintenance'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-red-500/20 text-red-500'
                      }`}>
                        {server.status === 'online' ? 'Online' : 
                         server.status === 'maintenance' ? 'Maintenance' : 'Offline'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Region:</span>
                      <span className="text-white">{server.region}</span>
                    </div>
                    
                    {server.status === 'online' && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-white/60 text-sm">Ping:</span>
                          <span className="text-white">{server.ping} ms</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-white/60 text-sm">Load:</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-white/10 h-2 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  server.load < 50 ? 'bg-vpn-green' : 
                                  server.load < 80 ? 'bg-yellow-500' : 
                                  'bg-red-500'
                                }`}
                                style={{ width: `${server.load}%` }}
                              ></div>
                            </div>
                            <span className="text-white text-sm">{server.load}%</span>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">Last updated:</span>
                      <span className="text-white/80 text-sm">
                        {server.lastUpdated.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className={
                      server.status === 'online' 
                      ? 'bg-vpn-green hover:bg-vpn-green-dark text-black w-full'
                      : 'bg-white/10 text-white w-full cursor-not-allowed opacity-70'
                    }
                    disabled={server.status !== 'online'}
                  >
                    {server.status === 'online' ? 'Connect' : 'Unavailable'}
                  </Button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Server className="text-white/40 w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">No servers found</h3>
                <p className="text-white/60 text-center max-w-md">
                  No servers match your current search criteria. Try adjusting your filters or search query.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-white/10 hover:bg-white/5"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ServerStatus;
