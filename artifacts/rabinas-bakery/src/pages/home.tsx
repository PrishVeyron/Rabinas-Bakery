import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Star, Heart, Leaf, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetFeaturedItems } from "@workspace/api-client-react";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: featuredItems, isLoading } = useGetFeaturedItems();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="/images/hero.png" 
          alt="Rabina's Bakery Counter" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="container relative z-20 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary-foreground backdrop-blur-md text-sm font-medium mb-6 uppercase tracking-wider border border-primary/30">
              Made with Natural Coconut Oil
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg leading-tight">
              Baked with love,<br/>tastes like home.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 drop-shadow-md max-w-2xl mx-auto">
              Discover Kathmandu's coziest secret. Handcrafted cookies and cakes made from scratch, 
              just like your neighbor's secret baking talent.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/menu">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 shadow-xl">
                  Order Now
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-white/10 text-white hover:bg-white/20 hover:text-white border-white/30 backdrop-blur-sm">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Fresh from the Oven</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most loved creations, baked fresh daily. Perfect for treating yourself or sharing with someone special.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col gap-4">
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full mt-4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems?.slice(0, 3).map((item, i) => (
                <ProductCard key={item.id} product={item} index={i} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/menu">
              <Button variant="outline" size="lg" className="group">
                View Full Menu
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Coconut Oil Section */}
      <section className="py-20 bg-accent/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
                The Coconut Oil Difference
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                At Rabina's Bakery, we believe ingredients matter. That's why coconut oil is the hero of our kitchen. It brings a subtle, natural sweetness and creates an incredibly moist texture that you just can't get from standard butter or vegetable oils.
              </p>
              
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">100% Natural</h4>
                    <p className="text-muted-foreground">We use pure, unrefined coconut oil. No artificial preservatives or hydrogenated fats.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Wholesome Goodness</h4>
                    <p className="text-muted-foreground">A healthier fat choice that doesn't compromise on that rich, comforting bakery taste.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Baked Daily</h4>
                    <p className="text-muted-foreground">Small batches ensure every cookie and cake reaches you at peak freshness.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-8 border-background rotate-3 transform transition-transform hover:rotate-0 duration-500">
                <img src="/images/cookie.png" alt="Fresh baked cookies" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-background p-6 rounded-xl shadow-xl max-w-[250px] -rotate-3 border border-border/50">
                <div className="flex gap-1 text-primary mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="font-serif italic text-sm text-foreground/80">
                  "The most incredible texture I've ever tasted in a cookie. The coconut oil makes them perfectly soft and chewy."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        <div className="container mx-auto relative z-10 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready for something sweet?</h2>
          <p className="text-xl text-primary-foreground/90 mb-10">
            Let us bake something special just for you today.
          </p>
          <Link href="/menu">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-10 shadow-xl">
              Browse Menu & Order
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
