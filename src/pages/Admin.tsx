
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Users, 
  Server, 
  Settings, 
  BarChart4, 
  Activity, 
  Trash2,
  Edit,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: 'активен' | 'заблокирован';
  joined: string;
}

interface ServerData {
  id: number;
  location: string;
  status: 'онлайн' | 'офлайн' | 'техобслуживание';
  load: number;
  users: number;
}

const AdminPage = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'servers' | 'settings' | 'stats'>('users');
  
  // Демо-данные для пользователей
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Иван Петров', email: 'ivan@example.com', plan: 'Премиум', status: 'активен', joined: '12.03.2023' },
    { id: 2, name: 'Анна Сидорова', email: 'anna@example.com', plan: 'Базовый', status: 'активен', joined: '05.05.2023' },
    { id: 3, name: 'Михаил Иванов', email: 'mikhail@example.com', plan: 'Корпоративный', status: 'заблокирован', joined: '18.01.2023' },
    { id: 4, name: 'Елена Смирнова', email: 'elena@example.com', plan: 'Премиум', status: 'активен', joined: '21.08.2023' },
    { id: 5, name: 'Сергей Козлов', email: 'sergey@example.com', plan: 'Базовый', status: 'активен', joined: '03.11.2023' },
  ]);
  
  // Демо-данные для серверов
  const [servers, setServers] = useState<ServerData[]>([
    { id: 1, location: 'Москва', status: 'онлайн', load: 78, users: 256 },
    { id: 2, location: 'Санкт-Петербург', status: 'онлайн', load: 65, users: 178 },
    { id: 3, location: 'Новосибирск', status: 'техобслуживание', load: 10, users: 45 },
    { id: 4, location: 'Екатеринбург', status: 'онлайн', load: 42, users: 98 },
    { id: 5, location: 'Владивосток', status: 'офлайн', load: 0, users: 0 },
  ]);
  
  if (!isAdmin) {
    return (
      <div className="px-6 md:px-10 py-20 max-w-7xl mx-auto text-center">
        <Shield className="w-20 h-20 mx-auto text-red-500 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Доступ запрещен</h1>
        <p className="text-white/70 mb-8">У вас нет прав администратора для доступа к этой странице.</p>
      </div>
    );
  }
  
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success('Пользователь успешно удален');
  };
  
  const handleUpdateServerStatus = (id: number, newStatus: 'онлайн' | 'офлайн' | 'техобслуживание') => {
    setServers(servers.map(server => 
      server.id === id ? {...server, status: newStatus} : server
    ));
    toast.success(`Статус сервера обновлен на: ${newStatus}`);
  };
  
  return (
    <div className="px-6 md:px-10 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Панель администратора</h1>
        <p className="text-white/70">Управление пользователями, серверами и настройками VPN-сервиса</p>
      </motion.div>
      
      {/* Навигационные вкладки */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
        <Button 
          variant={activeTab === 'users' ? 'default' : 'ghost'} 
          onClick={() => setActiveTab('users')}
          className={activeTab === 'users' ? 'bg-vpn-green text-black' : ''}
        >
          <Users className="w-4 h-4 mr-2" />
          Пользователи
        </Button>
        <Button 
          variant={activeTab === 'servers' ? 'default' : 'ghost'} 
          onClick={() => setActiveTab('servers')}
          className={activeTab === 'servers' ? 'bg-vpn-green text-black' : ''}
        >
          <Server className="w-4 h-4 mr-2" />
          Серверы
        </Button>
        <Button 
          variant={activeTab === 'stats' ? 'default' : 'ghost'} 
          onClick={() => setActiveTab('stats')}
          className={activeTab === 'stats' ? 'bg-vpn-green text-black' : ''}
        >
          <BarChart4 className="w-4 h-4 mr-2" />
          Статистика
        </Button>
        <Button 
          variant={activeTab === 'settings' ? 'default' : 'ghost'} 
          onClick={() => setActiveTab('settings')}
          className={activeTab === 'settings' ? 'bg-vpn-green text-black' : ''}
        >
          <Settings className="w-4 h-4 mr-2" />
          Настройки
        </Button>
      </div>
      
      {/* Содержимое панели администратора */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="glass-panel p-6 rounded-xl"
      >
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Управление пользователями</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить пользователя
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Имя</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Тариф</th>
                    <th className="text-left py-3 px-4">Статус</th>
                    <th className="text-left py-3 px-4">Дата регистрации</th>
                    <th className="text-right py-3 px-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">{user.id}</td>
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.plan}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          user.status === 'активен' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{user.joined}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-400" 
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'servers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Управление серверами</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить сервер
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servers.map(server => (
                <div key={server.id} className="glass-panel p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium">{server.location}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      server.status === 'онлайн' ? 'bg-green-500/20 text-green-400' : 
                      server.status === 'офлайн' ? 'bg-red-500/20 text-red-400' : 
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {server.status}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">Загрузка:</span>
                      <span>{server.load}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          server.load > 80 ? 'bg-red-500' : 
                          server.load > 50 ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}
                        style={{ width: `${server.load}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-sm mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-white/70">Пользователей:</span>
                      <span>{server.users}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleUpdateServerStatus(server.id, 'онлайн')}
                      disabled={server.status === 'онлайн'}
                    >
                      Включить
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleUpdateServerStatus(server.id, 'техобслуживание')}
                      disabled={server.status === 'техобслуживание'}
                    >
                      ТО
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleUpdateServerStatus(server.id, 'офлайн')}
                      disabled={server.status === 'офлайн'}
                    >
                      Выключить
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'stats' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Статистика системы</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="glass-panel p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-vpn-green/10 rounded-lg">
                    <Users className="w-5 h-5 text-vpn-green" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Всего пользователей</div>
                    <div className="text-2xl font-semibold">8,254</div>
                  </div>
                </div>
                <div className="text-xs text-white/60">
                  <span className="text-green-400">+12%</span> за последний месяц
                </div>
              </div>
              
              <div className="glass-panel p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-vpn-green/10 rounded-lg">
                    <Server className="w-5 h-5 text-vpn-green" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Активных серверов</div>
                    <div className="text-2xl font-semibold">124</div>
                  </div>
                </div>
                <div className="text-xs text-white/60">
                  <span className="text-green-400">99.8%</span> доступность
                </div>
              </div>
              
              <div className="glass-panel p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-vpn-green/10 rounded-lg">
                    <Activity className="w-5 h-5 text-vpn-green" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Трафик (в месяц)</div>
                    <div className="text-2xl font-semibold">256 ТБ</div>
                  </div>
                </div>
                <div className="text-xs text-white/60">
                  <span className="text-green-400">+18%</span> за последний месяц
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-lg">
              <h3 className="font-medium mb-4">График подключений</h3>
              <div className="h-64 flex items-end">
                {[35, 45, 30, 65, 50, 75, 85, 60, 90, 70, 55, 80].map((height, index) => (
                  <div key={index} className="flex-1 mx-1">
                    <div 
                      className="bg-vpn-green rounded-sm" 
                      style={{ height: `${height}%` }}
                      title={`${height}% загрузки`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-white/60 mt-2">
                <span>Янв</span>
                <span>Фев</span>
                <span>Мар</span>
                <span>Апр</span>
                <span>Май</span>
                <span>Июн</span>
                <span>Июл</span>
                <span>Авг</span>
                <span>Сен</span>
                <span>Окт</span>
                <span>Ноя</span>
                <span>Дек</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Настройки системы</h2>
            
            <div className="space-y-6">
              <div className="glass-panel p-4 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Режим обслуживания</h3>
                  <p className="text-sm text-white/70">Временно отключить все сервисы для технического обслуживания</p>
                </div>
                <Button variant="outline">Включить</Button>
              </div>
              
              <div className="glass-panel p-4 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Резервное копирование базы данных</h3>
                  <p className="text-sm text-white/70">Последнее резервное копирование: 23.05.2023, 03:45</p>
                </div>
                <Button>Создать копию</Button>
              </div>
              
              <div className="glass-panel p-4 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Обновление системы</h3>
                  <p className="text-sm text-white/70">Текущая версия: v2.5.3</p>
                </div>
                <Button variant="outline">Проверить обновления</Button>
              </div>
              
              <div className="glass-panel p-4 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Очистка логов</h3>
                  <p className="text-sm text-white/70">Удалить логи старше 30 дней</p>
                </div>
                <Button variant="destructive">Очистить</Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminPage;
