import React, { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import QRCode from "qrcode";
import { CheckCircle2, Copy, AlertCircle, ExternalLink, Check } from "lucide-react";
import { useGetOrder } from "@workspace/api-client-react";
import { formatNPR } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const INSTAGRAM_USERNAME = "rabinabakeryandcake";

function buildOrderMessage(order: {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  deliveryAddress?: string | null;
  items: Array<{ productName: string; quantity: number; unitPrice: number; subtotal: number }>;
  totalAmount: number;
  paymentMethod: string;
  notes?: string | null;
}): string {
  const itemLines = order.items
    .map(i => `  - ${i.productName} x${i.quantity} = ₹${Number(i.subtotal).toLocaleString('en-IN')}`)
    .join("\n");
  const paymentLabel =
    order.paymentMethod === "qr_code" ? "QR Code"
    : order.paymentMethod === "credit_card" ? "Credit Card"
    : "Cash on Delivery";

  return (
    `New Order #${order.id} - Rabina's Bakery\n\n` +
    `Customer: ${order.customerName}\n` +
    `Phone: ${order.customerPhone}\n` +
    (order.customerEmail ? `Email: ${order.customerEmail}\n` : "") +
    (order.deliveryAddress ? `Delivery Address: ${order.deliveryAddress}\n` : "") +
    `\nItems:\n${itemLines}\n\n` +
    `Total: ₹${Number(order.totalAmount).toLocaleString('en-IN')}\n` +
    `Payment: ${paymentLabel}\n` +
    (order.notes ? `Notes: ${order.notes}\n` : "") +
    `\nPlease confirm this order. Thank you!`
  );
}

export default function OrderConfirmation() {
  const params = useParams();
  const orderId = Number(params.id);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const { data: order, isLoading, error } = useGetOrder(orderId, {
    query: {
      enabled: !!orderId,
      queryKey: ["/api/orders", orderId] as any,
    }
  });

  useEffect(() => {
    if (order && order.paymentMethod === "qr_code") {
      const paymentString = `Pay INR ${order.totalAmount} to Rabina's Bakery - Order #${order.id}`;
      QRCode.toDataURL(paymentString, {
        width: 300,
        margin: 2,
        color: { dark: '#3d1c00', light: '#ffffff' }
      })
      .then(url => setQrCodeDataUrl(url))
      .catch(() => {});
    }
  }, [order]);

  const handleCopyAndOpenInstagram = () => {
    if (!order) return;
    const message = buildOrderMessage({
      ...order,
      items: order.items as Array<{ productName: string; quantity: number; unitPrice: number; subtotal: number }>,
    });
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        window.open(`https://ig.me/m/${INSTAGRAM_USERNAME}`, "_blank");
      }, 800);
    }).catch(() => {
      window.open(`https://ig.me/m/${INSTAGRAM_USERNAME}`, "_blank");
    });
  };

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <AlertCircle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find the order you're looking for.</p>
        <Link href="/"><Button>Return Home</Button></Link>
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

  const orderMessage = buildOrderMessage({
    ...order,
    items: order.items as Array<{ productName: string; quantity: number; unitPrice: number; subtotal: number }>,
  });

  return (
    <div className="min-h-screen bg-background pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Thank you, {order.customerName.split(' ')[0]}! Your delicious treats will be prepared soon.
          </p>
        </div>

        {/* Instagram DM CTA */}
        <Card className="mb-8 border-primary/30 shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] p-0">
            <div className="px-6 py-5 flex items-center gap-4">
              {/* Instagram icon SVG */}
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-tight">Send your order on Instagram</p>
                <p className="text-white/80 text-sm">@{INSTAGRAM_USERNAME}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-4">
              Copy the message below, then open our Instagram DM and paste it to confirm your order.
            </p>

            {/* Order message box */}
            <div className="bg-muted rounded-xl p-4 mb-5 relative border border-border">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                {orderMessage}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(orderMessage);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute top-3 right-3 p-1.5 rounded-md bg-background border border-border hover:bg-muted-foreground/10 transition-colors"
                data-testid="button-copy-order"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
              </button>
            </div>

            <Button
              className="w-full gap-2 text-white font-bold"
              style={{ background: "linear-gradient(90deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
              size="lg"
              onClick={handleCopyAndOpenInstagram}
              data-testid="button-open-instagram"
            >
              {copied ? (
                <><Check className="h-5 w-5" /> Copied! Opening Instagram...</>
              ) : (
                <><ExternalLink className="h-5 w-5" /> Copy &amp; Open Instagram DM</>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Order Summary */}
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
                  {(order.items as Array<{ productName: string; quantity: number; unitPrice: number; subtotal: number }>).map((item, idx) => (
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

        {/* Payment Instructions */}
        {order.paymentMethod === "qr_code" && (
          <Card className="border-primary/30 shadow-md mb-8">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="font-serif text-xl text-center">Complete Payment via QR</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center flex flex-col items-center">
              <p className="text-muted-foreground mb-6">
                Scan this QR code with any UPI app to complete your payment of <strong>{formatNPR(order.totalAmount)}</strong>
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
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">UPI / Pay to number</p>
                  <p className="font-mono font-bold text-lg tracking-wider">+91 9864099823</p>
                </div>
                <Button variant="outline" size="icon" className="shrink-0" onClick={() => navigator.clipboard.writeText("+919864099823")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {order.paymentMethod === "credit_card" && (
          <Card className="border-primary/30 shadow-md mb-8">
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
          <Card className="bg-accent/20 border-accent shadow-sm mb-8">
            <CardContent className="p-6 text-center">
              <h3 className="font-serif text-xl font-bold mb-2">Cash on Delivery</h3>
              <p className="text-muted-foreground">
                Please have <strong>{formatNPR(order.totalAmount)}</strong> ready in cash when your order arrives.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="mt-4 text-center">
          <Link href="/"><Button variant="outline" size="lg">Return to Home</Button></Link>
        </div>
      </div>
    </div>
  );
}
