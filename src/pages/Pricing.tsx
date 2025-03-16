import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Star, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  Wifi, 
  Globe,
  HelpCircle,
  DownloadCloud,
  Zap,
  Construction
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import PromoCodeForm from '@/components/PromoCodeForm';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import PurchaseConfirmDialog from '@/components/PurchaseConfirmDialog';

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
    name: 'Базовый',
    monthly: 349,
    yearly: 3490,
    description: 'Необходимая защита для повседневного использования',
    features: [
      { title: '5 Одновременных подключений', included: true },
      { title: 'Стандартная скорость VPN', included: true },
      { title: 'Доступ к 30+ странам', included: true },
      { title: 'Без ограничений трафика', included: true },
      { title: 'Блокировщик рекламы', included: false },
      { title: 'Расширенные функции безопасности', included: false },
      { title: 'Премиум-локации серверов', included: false },
      { title: 'Приоритетная поддержка 24/7', included: false }
    ]
  },
  {
    id: 'pro',
    name: 'Профессиональный',
    monthly: 649,
    yearly: 6490,
    description: 'Расширенная защита с дополнительными возможностями',
    popular: true,
    features: [
      { title: '10 Одновременных подключений', included: true },
      { title: 'Высокая скорость VPN', included: true },
      { title: 'Доступ к 60+ странам', included: true },
      { title: 'Без ограничений трафика', included: true },
      { title: 'Блокировщик рекламы', included: true },
      { title: 'Расширенные функции безопасности', included: true },
      { title: 'Премиум-локации серверов', included: false },
      { title: 'Приоритетная поддержка 24/7', included: false }
    ]
  },
  {
    id: 'enterprise',
    name: 'Корпоративный',
    monthly: 999,
    yearly: 9990,
    description: 'Максимальная защита для требовательных пользователей',
    features: [
      { title: 'Неограниченное число подключений', included: true },
      { title: 'Максимальная скорость VPN', included: true },
      { title: 'Доступ к 95+ странам', included: true },
      { title: 'Без ограничений трафика', included: true },
      { title: 'Блокировщик рекламы', included: true },
      { title: 'Расширенные функции безопасности', included: true },
      { title: 'Премиум-локации серверов', included: true },
      { title: 'Приоритетная поддержка 24/7', included: true }
    ]
  }
];

const faqs = [
  {
    question: 'Как работает VPN-сервис?',
    answer: 'Наш VPN создает зашифрованный туннель между вашим устройством и нашими защищенными серверами, скрывая ваш IP-адрес и шифруя интернет-трафик. Это защищает вашу конфиденциальность и позволяет безопасно получать доступ к контенту из любой точки мира.'
  },
  {
    question: 'Могу ли я использовать VPN на нескольких устройствах?',
    answer: 'Да, в зависимости от выбранного тарифа, вы можете использовать наш VPN на нескольких устройствах одновременно. Базовый план поддерживает до 5 устройств, Профессиональный - до 10 устройств, а Корпоративный предлагает неограниченное количество подключений.'
  },
  {
    question: 'Ведется ли журнал моей активности в интернете?',
    answer: 'Нет, мы придерживаемся строгой политики отсутствия логов. Мы не отслеживаем, не записываем и не храним историю вашего браузера, назначение трафика, содержание данных или DNS-запросы. Ваша конфиденциальность - наш приоритет.'
  },
  {
    question: 'Могу ли я отменить подписку в любое время?',
    answer: 'Да, вы можете отменить подписку в любое время. Для ежемесячных подписок услуга продолжается до конца текущего расчетного периода. Для годовых подписок вы можете запросить пропорциональный возврат средств в течение первых 30 дней.'
  },
  {
    question: 'Какие способы оплаты вы принимаете?',
    answer: 'Мы принимаем оплату Звездами Telegram. Оплата через СБП находится в разработке и будет доступна в ближайшее время.'
  }
];

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { isAdmin } = useAuth();
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{id: string; name: string; price: number} | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleSubscribe = (planId: string, planName: string, price: number) => {
    setSelectedPlan({ id: planId, name: planName, price });
    setPurchaseDialogOpen(true);
  };

  const handlePaymentProcess = () => {
    if (!selectedPlan) return;
    
    toast.success(`Переход к оплате тарифа ${selectedPlan.name}`);
    // В реальном приложении здесь будет редирект на страницу оплаты или вызов API
  };

  return (
    <div className="px-6 md:px-10 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Простые и прозрачные тарифы</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Выберите идеальный тариф для ваших потребностей. Все тарифы включают базовую VPN-защиту.
        </p>

        {isAdmin && (
          <div className="mt-4">
            <Link to="/admin">
              <Button variant="outline" className="bg-vpn-green/10 border-vpn-green/50 text-vpn-green hover:bg-vpn-green/20">
                Перейти в панель администратора
              </Button>
            </Link>
          </div>
        )}
      </motion.div>

      {/* Переключатель биллинга */}
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
            Ежемесячно
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              billingCycle === 'yearly'
                ? 'bg-vpn-green text-black'
                : 'text-white hover:bg-white/5'
            }`}
          >
            Ежегодно
            <span className="ml-2 text-xs bg-vpn-green/20 px-2 py-0.5 rounded-full">
              Скидка 20%
            </span>
          </button>
        </div>
      </motion.div>

      {/* Тарифы */}
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
                Самый популярный
              </div>
            )}

            <div className="mb-6 pt-4">
              <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
              <p className="text-white/60 mb-4 min-h-[40px]">{plan.description}</p>
              
              <div className="flex items-baseline gap-2 mb-4">
                <Star className="h-5 w-5 text-[#FFD700] fill-[#FFD700]" />
                <span className="text-3xl font-bold">
                  {billingCycle === 'monthly' ? plan.monthly : (plan.yearly / 12).toFixed(0)}
                </span>
                <span className="text-white/60">/ месяц</span>
              </div>
              
              {billingCycle === 'yearly' && (
                <div className="text-sm bg-vpn-green/10 text-vpn-green rounded-lg py-1.5 px-3 mb-4 inline-block">
                  <Star className="h-4 w-4 text-[#FFD700] fill-[#FFD700] inline mr-1" />
                  Экономия {(plan.monthly * 12 - plan.yearly).toFixed(0)} звезд в год
                </div>
              )}
              
              <Button 
                onClick={() => handleSubscribe(
                  plan.id, 
                  plan.name, 
                  billingCycle === 'monthly' ? plan.monthly : plan.yearly
                )}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-vpn-green hover:bg-vpn-green-dark text-black' 
                    : 'bg-white/10 hover:bg-white/15 text-white'
                }`}
              >
                Оформить подписку
              </Button>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <div className="text-sm font-medium mb-3">Тариф включает:</div>
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

      {/* Способы оплаты */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="glass-panel p-8 md:p-10 rounded-2xl mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Способы оплаты</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4 p-4 bg-vpn-green/10 rounded-xl">
            <div className="w-12 h-12 flex items-center justify-center bg-vpn-green/20 rounded-lg">
              <Star className="w-6 h-6 text-[#FFD700] fill-[#FFD700]" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Звезды Telegram</h3>
              <p className="text-white/70 text-sm">
                Быстрая и безопасная оплата Звездами Telegram
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
            <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-lg">
              <div className="relative">
                <CreditCard className="w-6 h-6 text-white/50" />
                <Construction className="w-4 h-4 text-vpn-green absolute -top-1 -right-1" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg mb-1">Оплата через СБП</h3>
                <span className="bg-vpn-green/20 text-vpn-green text-xs px-2 py-0.5 rounded-full">
                  В разработке
                </span>
              </div>
              <p className="text-white/70 text-sm">
                Скоро будет доступна оплата через Систему Быстрых Платежей
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Промокод */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="glass-panel p-8 md:p-10 rounded-2xl mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">У вас есть промокод?</h2>
        <p className="text-white/70 text-center mb-8">
          Введите промокод, чтобы получить скидку на подписку VPN.
        </p>
        
        <PromoCodeForm />
      </motion.div>

      {/* Преимущества */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Почему выбирают наш VPN?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass-panel p-6 rounded-xl">
            <div className="w-12 h-12 flex items-center justify-center bg-vpn-green/10 rounded-lg mb-5">
              <ShieldCheck className="w-6 h-6 text-vpn-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Полная приватность</h3>
            <p className="text-white/70">
              Продвинутое шифрование и строгая политика отсутствия логов для защиты ваших данных.
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-xl">
            <div className="w-12 h-12 flex items-center justify-center bg-vpn-green/10 rounded-lg mb-5">
              <Zap className="w-6 h-6 text-vpn-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Молниеносная скорость</h3>
            <p className="text-white/70">
              Оптимизированные серверы для максимальной скорости и минимальной задержки.
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-xl">
            <div className="w-12 h-12 flex items-center justify-center bg-vpn-green/10 rounded-lg mb-5">
              <Globe className="w-6 h-6 text-vpn-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Глобальный доступ</h3>
            <p className="text-white/70">
              Подключайтесь к серверам в 95+ странах для доступа к контенту из любой точки мира.
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-xl">
            <div className="w-12 h-12 flex items-center justify-center bg-vpn-green/10 rounded-lg mb-5">
              <DownloadCloud className="w-6 h-6 text-vpn-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Простое использование</h3>
            <p className="text-white/70">
              Подключение в один клик на всех ваших устройствах.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Часто задаваемые вопросы */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Часто задаваемые вопросы
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

      {/* CTA Секция */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <div className="glass-panel p-10 md:p-16 rounded-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы защитить ваше соединение?</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Присоединяйтесь к миллионам пользователей, которые доверяют нашему VPN для защиты конфиденциальности и безопасности в интернете.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-vpn-green hover:bg-vpn-green-dark text-black font-medium px-8">
              Начать сейчас
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/5">
              Связаться с отделом продаж
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Диалог подтверждения покупки */}
      {selectedPlan && (
        <PurchaseConfirmDialog
          open={purchaseDialogOpen}
          onOpenChange={setPurchaseDialogOpen}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          onConfirm={handlePaymentProcess}
        />
      )}
    </div>
  );
};

export default Pricing;
