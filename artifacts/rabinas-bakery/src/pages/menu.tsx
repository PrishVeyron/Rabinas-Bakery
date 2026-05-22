import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useListProducts, useListMenuCategories } from "@workspace/api-client-react";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  
  const { data: categories, isLoading: isLoadingCategories } = useListMenuCategories();
  const { data: products, isLoading: isLoadingProducts } = useListProducts({ category: activeCategory });

  return (
    <div className="min-h-screen bg-background pt-8 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Our Menu</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything is made from scratch in small batches using natural coconut oil. 
            Browse our selection of wholesome treats.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={activeCategory === undefined ? "default" : "outline"}
            onClick={() => setActiveCategory(undefined)}
            className="rounded-full"
          >
            All Items
          </Button>
          
          {isLoadingCategories ? (
            <>
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-28 rounded-full" />
            </>
          ) : (
            categories?.map(category => (
              <Button
                key={category.name}
                variant={activeCategory === category.name ? "default" : "outline"}
                onClick={() => setActiveCategory(category.name)}
                className="rounded-full"
              >
                {category.name} <span className="ml-2 text-xs opacity-70">({category.productCount})</span>
              </Button>
            ))
          )}
        </div>

        {/* Products Grid */}
        {isLoadingProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            layout
          >
            <AnimatePresence>
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-border border-dashed">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-2">No items found</h3>
            <p className="text-muted-foreground mb-6">We couldn't find any products in this category.</p>
            <Button onClick={() => setActiveCategory(undefined)}>
              View All Items
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
