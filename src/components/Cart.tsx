import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  options: string;
}

interface CartProps {
  language: 'cs' | 'en';
}

const Cart = ({ language }: CartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Fotokniha A4',
      price: 890,
      quantity: 1,
      options: '20 stran, lesklý papír'
    }
  ]);

  const t = {
    cs: {
      cart: "Košík",
      empty: "Košík je prázdný",
      total: "Celkem",
      vat: "včetně DPH",
      checkout: "K pokladně",
      continue: "Pokračovat v nákupu",
      remove: "Odebrat"
    },
    en: {
      cart: "Cart",
      empty: "Cart is empty", 
      total: "Total",
      vat: "including VAT",
      checkout: "Checkout",
      continue: "Continue Shopping",
      remove: "Remove"
    }
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (id: string, change: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success(t[language].remove);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel relative"
      >
        <ShoppingCart className="h-4 w-4" />
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            {totalItems}
          </Badge>
        )}
      </Button>
      
      {isOpen && (
        <div className="absolute top-12 right-0 w-96 glass-panel border border-border/20 rounded-lg p-4 z-50">
          <h3 className="font-semibold mb-4">{t[language].cart}</h3>
          
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">{t[language].empty}</p>
          ) : (
            <>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <Card key={item.id} className="p-3 glass-panel">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.options}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="font-semibold">{item.price * item.quantity} Kč</span>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="border-t border-border/20 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">{t[language].total}:</span>
                  <div className="text-right">
                    <div className="font-bold text-lg">{totalPrice} Kč</div>
                    <div className="text-xs text-muted-foreground">{t[language].vat}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="glossy" className="w-full">
                    {t[language].checkout}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    {t[language].continue}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;