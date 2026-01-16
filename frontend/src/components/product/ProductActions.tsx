import { ShoppingCart, Zap, CalendarClock } from "lucide-react"
import { Button } from "../ui/Button"

interface ProductActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
  onBookService: () => void;
  isService?: boolean;
}

export default function ProductActions({ onAddToCart, onBuyNow, onBookService, isService = false }: ProductActionsProps) {
  return (
    <div className="flex flex-col gap-3 pt-6 border-t border-border">
      
      {!isService ? (
        <>
          <div className="grid grid-cols-2 gap-3">
             <Button 
               size="lg" 
               variant="outline" 
               onClick={onAddToCart}
               className="w-full"
             >
               <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
             </Button>
             <Button 
               size="lg" 
               variant="default" // Using default (primary) for Buy Now
               onClick={onBuyNow}
               className="w-full bg-primary hover:bg-red-700 text-white shadow-lg shadow-primary/20"
             >
               <Zap className="mr-2 h-4 w-4" /> Buy Now
             </Button>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mt-2">Free shipping on orders over $500</p>
          </div>
        </>
      ) : (
        <Button 
           size="lg" 
           variant="default"
           onClick={onBookService}
           className="w-full bg-primary hover:bg-red-700 shadow-lg shadow-primary/20"
        >
          <CalendarClock className="mr-2 h-4 w-4" /> Book Consultation
        </Button>
      )}

      {/* Trust Micro-copy */}
      <div className="flex items-center justify-center gap-4 mt-2 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
         <span className="text-xs font-medium text-muted-foreground">Secure Checkout</span>
         <div className="h-3 w-[1px] bg-border"></div>
         <span className="text-xs font-medium text-muted-foreground">ISO Certified</span>
         <div className="h-3 w-[1px] bg-border"></div>
         <span className="text-xs font-medium text-muted-foreground">24/7 Support</span>
      </div>

    </div>
  )
}
