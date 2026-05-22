import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatNPR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useCreateOrder, OrderInputPaymentMethod } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().min(8, "Valid phone number required"),
  customerEmail: z.string().email("Valid email required").or(z.literal("")).optional(),
  deliveryAddress: z.string().min(5, "Delivery address is required"),
  paymentMethod: z.enum(["qr_code", "credit_card", "cash"]),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Cart() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const createOrder = useCreateOrder();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      deliveryAddress: "",
      paymentMethod: "cash",
      notes: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }

    const orderInput = {
      ...data,
      paymentMethod: data.paymentMethod as OrderInputPaymentMethod,
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    createOrder.mutate(
      { data: orderInput },
      {
        onSuccess: (order) => {
          clearCart();
          toast({
            title: "Order Placed Successfully",
            description: "We've received your order and sent a WhatsApp confirmation.",
          });
          setLocation(`/order-confirmation/${order.id}`);
        },
        onError: () => {
          toast({
            title: "Error",
            description: "There was a problem placing your order. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background px-4">
        <div className="bg-muted/30 p-8 rounded-full mb-6">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven't added any of our delicious treats to your cart yet.
        </p>
        <Link href="/menu">
          <Button size="lg" className="h-12 px-8">
            Browse Our Menu
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-4 py-2">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-muted shrink-0">
                      <img 
                        src={item.imageUrl || "/images/cookie.png"} 
                        alt={item.productName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-foreground text-lg leading-tight">{item.productName}</h3>
                        <span className="font-bold text-primary whitespace-nowrap">{formatNPR(item.unitPrice * item.quantity)}</span>
                      </div>
                      
                      <div className="flex justify-between items-end mt-auto">
                        <div className="flex items-center border border-border rounded-md bg-background">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-none"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-none"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 px-2 h-8"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span className="text-xs">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <Separator />
              <CardFooter className="flex-col pt-6 gap-2">
                <div className="w-full flex justify-between text-muted-foreground mb-2">
                  <span>Subtotal</span>
                  <span>{formatNPR(cartTotal)}</span>
                </div>
                <div className="w-full flex justify-between text-muted-foreground mb-4">
                  <span>Delivery</span>
                  <span>Calculated later</span>
                </div>
                <div className="w-full flex justify-between text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-primary">{formatNPR(cartTotal)}</span>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-5">
            <Card className="sticky top-24 border-primary/20 shadow-md">
              <CardHeader className="bg-primary/5 border-b border-border/50 pb-6">
                <CardTitle className="font-serif text-2xl">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Rabina Shrestha" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="customerPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="98XXXXXXXX" type="tel" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="customerEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="email@example.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="deliveryAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Address</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Full street address, neighborhood, landmarks" 
                                className="resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3 pt-4 border-t border-border/50">
                            <FormLabel className="text-base font-bold text-foreground">Payment Method</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-1 gap-3"
                              >
                                <div>
                                  <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                                  <Label
                                    htmlFor="cash"
                                    className="flex items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent/50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                  >
                                    <div className="flex flex-col gap-1">
                                      <span className="font-semibold text-foreground">Cash on Delivery</span>
                                      <span className="text-xs text-muted-foreground">Pay when your order arrives</span>
                                    </div>
                                  </Label>
                                </div>
                                
                                <div>
                                  <RadioGroupItem value="qr_code" id="qr" className="peer sr-only" />
                                  <Label
                                    htmlFor="qr"
                                    className="flex items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent/50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                  >
                                    <div className="flex flex-col gap-1">
                                      <span className="font-semibold text-foreground">QR Payment</span>
                                      <span className="text-xs text-muted-foreground">Scan eSewa/FonePay QR after order</span>
                                    </div>
                                  </Label>
                                </div>

                                <div>
                                  <RadioGroupItem value="credit_card" id="card" className="peer sr-only" />
                                  <Label
                                    htmlFor="card"
                                    className="flex items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent/50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                  >
                                    <div className="flex flex-col gap-1">
                                      <span className="font-semibold text-foreground">Credit Card</span>
                                      <span className="text-xs text-muted-foreground">Pay securely with card</span>
                                    </div>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="pt-4 border-t border-border/50">
                            <FormLabel>Order Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any special requests or allergies?" 
                                className="resize-none h-20" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg mt-6" 
                      disabled={createOrder.isPending}
                    >
                      {createOrder.isPending ? "Placing Order..." : `Place Order • ${formatNPR(cartTotal)}`}
                      {!createOrder.isPending && <ArrowRight className="ml-2 h-5 w-5" />}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
