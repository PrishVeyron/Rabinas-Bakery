import React from "react";
import { Product } from "@workspace/api-client-react/src/generated/api.schemas";
import { useCart } from "@/lib/cart-context";
import { formatNPR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Plus, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.name,
      unitPrice: product.price,
      imageUrl: product.imageUrl,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  // Fallback images based on category if imageUrl is missing or broken
  const getImageUrl = () => {
    if (product.imageUrl && product.imageUrl.startsWith("http")) return product.imageUrl;
    const cat = product.category.toLowerCase();
    if (cat.includes("cookie")) return "/images/cookie.png";
    if (cat.includes("cake")) return "/images/cake.png";
    return "/images/special.png";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50 bg-card">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={getImageUrl()}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center backdrop-blur-sm">
              <span className="font-bold text-foreground bg-background/80 px-4 py-2 rounded-full text-sm uppercase tracking-wider">
                Sold Out
              </span>
            </div>
          )}
          {product.isFeatured && product.inStock && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Featured
            </div>
          )}
        </div>
        
        <CardContent className="flex-1 p-5 flex flex-col">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-serif text-xl font-bold text-foreground leading-tight">{product.name}</h3>
            <span className="font-bold text-primary whitespace-nowrap">{formatNPR(product.price)}</span>
          </div>
          <p className="text-muted-foreground text-sm flex-1 leading-relaxed line-clamp-3">
            {product.description}
          </p>
          {product.ingredients && (
            <p className="text-xs text-muted-foreground/70 mt-3 pt-3 border-t border-border/50">
              <span className="font-medium text-foreground/80">Made with:</span> {product.ingredients}
            </p>
          )}
        </CardContent>
        
        <CardFooter className="p-5 pt-0 mt-auto">
          <Button 
            className="w-full group/btn" 
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            {product.inStock ? (
              <span className="flex items-center gap-2">
                <Plus className="h-4 w-4 transition-transform group-hover/btn:rotate-90" />
                Add to Cart
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Unavailable
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
