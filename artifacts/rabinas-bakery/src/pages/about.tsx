import React from "react";
import { motion } from "framer-motion";
import { Heart, ShieldCheck, Sun } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src="/images/cake.png" 
          alt="Baking ingredients" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="container relative z-20 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
              Our Story
            </h1>
            <p className="text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto font-medium">
              A tiny kitchen with a big heart, bringing the comforting taste of home to Kathmandu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg md:prose-xl prose-stone mx-auto text-muted-foreground">
            <p className="lead text-2xl text-foreground font-serif font-medium mb-8">
              Rabina's Bakery started with a simple belief: the best food doesn't come from a factory, it comes from a home kitchen filled with love and good ingredients.
            </p>
            
            <p>
              It all began when Rabina started baking cookies for her neighbors using her grandmother's recipes. But she added her own twist — replacing heavy butter and processed oils with pure, natural coconut oil. The result was extraordinary: cookies that were crisp on the outside, impossibly chewy on the inside, and carried a subtle, wholesome sweetness that everyone fell in love with.
            </p>
            
            <p>
              Word spread quickly. Soon, people from across Kathmandu were knocking on her door, asking if they could buy the "secret coconut oil cookies." Rabina's Bakery was born.
            </p>
            
            <p>
              Today, we've grown a little bigger, but our process remains exactly the same. We don't use industrial mixers or artificial preservatives. Every single cookie, cake, and pastry is mixed by hand, baked in small batches, and crafted with the same care Rabina gave to those very first batches for her neighbors.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-foreground mb-16">
            Our Commitments
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Sun className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">100% Coconut Oil</h3>
              <p className="text-muted-foreground">
                We exclusively use premium, natural coconut oil. It's a healthier alternative that gives our bakes an incredible texture and a clean, delicate flavor profile you won't find anywhere else.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Handcrafted</h3>
              <p className="text-muted-foreground">
                No shortcuts. No mass production. Everything we sell is made entirely from scratch by human hands who genuinely care about the craft of baking.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Freshness Guarantee</h3>
              <p className="text-muted-foreground">
                We bake in small, continuous batches throughout the day. What you order was baked fresh, ensuring you get the absolute best experience with every bite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <img src="/images/cookie.png" alt="Baking process" className="w-full h-64 object-cover rounded-xl" />
            <img src="/images/cake.png" alt="Fresh ingredients" className="w-full h-64 object-cover rounded-xl" />
            <img src="/images/special.png" alt="Finished pastries" className="w-full h-64 object-cover rounded-xl md:col-span-2 lg:col-span-1" />
          </div>
        </div>
      </section>
    </div>
  );
}
