
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckIcon, X } from 'lucide-react';

// Mock promo codes for demonstration
const VALID_PROMO_CODES = {
  'WELCOME25': { discount: '25%', description: 'Welcome discount on any plan' },
  'SUMMER50': { discount: '50%', description: 'Summer special offer' },
  'FREE30': { discount: '30 days free', description: 'Free trial extension' }
};

interface PromoResult {
  isValid: boolean;
  code: string;
  discount?: string;
  description?: string;
}

const PromoCodeForm: React.FC = () => {
  const [promoCode, setPromoCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<PromoResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!promoCode.trim()) {
      toast.error('Please enter a promo code');
      return;
    }
    
    setIsChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      const formattedCode = promoCode.trim().toUpperCase();
      const validPromo = VALID_PROMO_CODES[formattedCode as keyof typeof VALID_PROMO_CODES];
      
      if (validPromo) {
        setResult({
          isValid: true,
          code: formattedCode,
          discount: validPromo.discount,
          description: validPromo.description
        });
        toast.success(`Promo code "${formattedCode}" applied successfully!`);
      } else {
        setResult({
          isValid: false,
          code: formattedCode
        });
        toast.error(`Invalid promo code: "${formattedCode}"`);
      }
      
      setIsChecking(false);
    }, 1000);
  };

  const resetForm = () => {
    setPromoCode('');
    setResult(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              placeholder="Enter promo code..."
              className="w-full bg-vpn-black border border-white/10 focus:border-vpn-green/50 outline-none rounded-lg px-4 py-3 text-white placeholder:text-white/40"
              disabled={isChecking || result?.isValid}
            />
            {result && (
              <button 
                type="button"
                onClick={resetForm}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <Button 
            type="submit" 
            className="bg-vpn-green hover:bg-vpn-green-dark text-black font-medium py-3 px-6"
            disabled={isChecking || !promoCode.trim() || result?.isValid}
          >
            {isChecking ? 'Checking...' : result?.isValid ? 'Applied' : 'Apply Code'}
          </Button>
        </div>
      </form>

      {result && (
        <div className={`rounded-lg p-4 mb-4 flex items-start gap-3 ${
          result.isValid 
            ? 'bg-vpn-green/10 border border-vpn-green/30' 
            : 'bg-red-500/10 border border-red-500/30'
        }`}>
          {result.isValid ? (
            <CheckIcon className="w-5 h-5 text-vpn-green shrink-0 mt-0.5" />
          ) : (
            <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          )}
          
          <div>
            <p className={`font-medium ${result.isValid ? 'text-vpn-green' : 'text-red-500'}`}>
              {result.isValid ? 'Valid promo code' : 'Invalid promo code'}
            </p>
            
            {result.isValid ? (
              <>
                <p className="text-white/80 text-sm">
                  Code: <span className="font-medium">{result.code}</span> - {result.discount} discount
                </p>
                <p className="text-white/70 text-sm">{result.description}</p>
              </>
            ) : (
              <p className="text-white/70 text-sm">
                The code "{result.code}" is invalid or has expired. Please check and try again.
              </p>
            )}
          </div>
        </div>
      )}

      <p className="text-white/50 text-xs text-center">
        *Try these demo codes: WELCOME25, SUMMER50, FREE30
      </p>
    </div>
  );
};

export default PromoCodeForm;
