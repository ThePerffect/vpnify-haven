
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface PurchaseConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  planPrice: number;
  onConfirm: () => void;
}

const PurchaseConfirmDialog: React.FC<PurchaseConfirmDialogProps> = ({
  open,
  onOpenChange,
  planName,
  planPrice,
  onConfirm
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleConfirm = () => {
    if (!termsAccepted || !privacyAccepted) {
      toast.error("Необходимо принять условия пользования и политику конфиденциальности");
      return;
    }
    
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Подтверждение подписки</DialogTitle>
          <DialogDescription>
            Вы собираетесь оформить подписку на тариф "{planName}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-between border-t border-b border-white/10 py-4 my-4">
          <div className="font-medium">Итоговая стоимость:</div>
          <div className="flex items-center gap-1 text-lg font-semibold">
            <Star className="h-5 w-5 text-[#FFD700] fill-[#FFD700]" />
            {planPrice}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Я принимаю <a href="#" className="text-vpn-green hover:underline">условия использования</a> и даю согласие на обработку моих данных
            </label>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="privacy" 
              checked={privacyAccepted}
              onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
            />
            <label
              htmlFor="privacy"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Я ознакомился с <a href="#" className="text-vpn-green hover:underline">политикой конфиденциальности</a> и согласен с её условиями
            </label>
          </div>
          
          {(!termsAccepted || !privacyAccepted) && (
            <div className="flex items-center gap-2 text-amber-400 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Для продолжения необходимо принять условия</span>
            </div>
          )}
        </div>
        
        <DialogFooter className="pt-4 flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="sm:w-auto w-full">
              Отмена
            </Button>
          </DialogClose>
          <Button 
            onClick={handleConfirm} 
            className="bg-vpn-green hover:bg-vpn-green-dark text-black sm:w-auto w-full"
          >
            Перейти к оплате
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseConfirmDialog;
