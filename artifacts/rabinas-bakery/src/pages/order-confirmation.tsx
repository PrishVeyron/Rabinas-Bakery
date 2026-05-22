import React, { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import QRCode from "qrcode";
import { CheckCircle2, Copy, AlertCircle } from "lucide-react";
import { useGetOrder } from "@workspace/api-client-react";
import { formatNPR } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function OrderConfirmation() {
  const params = useParams();
  const orderId = Number(params.id);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  const { data: order, isLoading, error } = useGetOrder(orderId, {
    query: { 
      enabled: !!orderId, 
      queryKey: ["/api/orders", orderId] as any 
    }
  });

  useEffect(() => {
    if (order && order.paymentMethod === "qr_code") {
      const paymentString = `Pay NPR ${order.totalAmount} to Rabina's Bakery - Order #${order.id}`;
      QRCode.toDataURL(paymentString, {
        width: 300,
        margin: 2,
        color: {
          dark: '#3d1c00', // Matches deep foreground color
          light: '#ffffff'
        }
      })
      .then(url => setQrCodeDataUrl(url))
      .catch(err => console.error(err));
    }
  }, [order]);

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <AlertCircle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find the order you're looking for.</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  if (isLoading || !order) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
        <Skeleton className="h-[600px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Thank you for your order, {order.customerName.split(' ')[0]}. 
            Your delicious treats will be prepared soon.
          </p>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8 text-center shadow-sm">
          <p className="text-lg font-medium text-foreground">
            Order confirmation sent to WhatsApp <strong>+977 9864099823</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            We'll contact you shortly to confirm delivery details.
          </p>
        </div>

        <Card className="mb-8 border-border shadow-md overflow-hidden">
          <div className="bg-muted/30 px-6 py-4 border-b border-border flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Order Number</p>
              <p className="text-xl font-bold font-mono">#{order.id.toString().padStart(5, '0')}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Date</p>
              <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold mb-4">Items Ordered</h3>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <span className="font-medium text-foreground">{item.productName}</span>
                      </div>
                      <span className="font-medium">{formatNPR(item.subtotal)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold text-foreground">Total Amount</span>
                <span className="font-bold text-primary text-2xl">{formatNPR(order.totalAmount)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Instructions based on method */}
        {order.paymentMethod === "qr_code" && (
          <Card className="border-primary/30 shadow-md">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="font-serif text-xl text-center">Complete Payment via QR</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center flex flex-col items-center">
              <p className="text-muted-foreground mb-6">
                Scan this QR code with eSewa or FonePay to complete your payment of <strong>{formatNPR(order.totalAmount)}</strong>
              </p>
              
              {qrCodeDataUrl ? (
                <div className="bg-white p-4 rounded-xl border border-border/50 shadow-sm mb-6 inline-block">
                  <img src={qrCodeDataUrl} alt="Payment QR Code" className="w-48 h-48" />
                </div>
              ) : (
                <Skeleton className="w-48 h-48 rounded-xl mb-6" />
              )}
              
              <div className="bg-muted px-4 py-3 rounded-lg flex items-center gap-3 w-full max-w-sm">
                <div className="flex-1 text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Or pay to number</p>
                  <p className="font-mono font-bold text-lg tracking-wider">9864099823</p>
                </div>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {order.paymentMethod === "credit_card" && (
          <Card className="border-primary/30 shadow-md">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="font-serif text-xl">Enter Card Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 max-w-md mx-auto">
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input placeholder="0000 0000 0000 0000" className="font-mono" />
                </div>
                <div className="space-y-2">
                  <Label>Name on Card</Label>
                  <Input placeholder={order.customerName} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input placeholder="123" type="password" maxLength={4} />
                  </div>
                </div>
                <Button className="w-full mt-6" size="lg">
                  Pay {formatNPR(order.totalAmount)} Securely
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  This is a demonstration form. No real payment will be processed.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {order.paymentMethod === "cash" && (
          <Card className="bg-accent/20 border-accent shadow-sm">
            <CardContent className="p-6 text-center">
              <h3 className="font-serif text-xl font-bold mb-2">Cash on Delivery</h3>
              <p className="text-muted-foreground">
                Please have <strong>{formatNPR(order.totalAmount)}</strong> ready in cash when your order arrives.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" size="lg">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
