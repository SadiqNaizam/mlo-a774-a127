import React, { useState } from 'react';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker from '@/components/OrderTracker';
import StarRatingDisplay from '@/components/StarRatingDisplay';

// shadcn/ui Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";

// Mock Data for the page
const currentOrder = {
  id: 'FD-12345XYZ',
  restaurantName: "Mama's Pizzeria",
  items: [
    { name: 'Large Margherita Pizza', quantity: 1, price: 18.99 },
    { name: 'Garlic Bread', quantity: 1, price: 5.49 },
    { name: 'Coke (2L)', quantity: 1, price: 3.00 },
  ],
  subtotal: 27.48,
  deliveryFee: 3.99,
  total: 31.47
};

const pastOrders = [
  {
    id: 'PO-9876',
    restaurantName: 'Sushi Central',
    date: 'July 28, 2024',
    total: '45.50',
    items: ['2x Spicy Tuna Roll', '1x Miso Soup'],
    initialRating: 4,
    status: 'Delivered',
  },
  {
    id: 'PO-5432',
    restaurantName: 'Burger Palace',
    date: 'July 25, 2024',
    total: '28.75',
    items: ['1x Palace Burger', '1x Large Fries', '1x Vanilla Shake'],
    initialRating: 5,
    status: 'Delivered',
  },
];

const OrderStatusTrackingPage = () => {
  console.log('Order Status / Tracking Page loaded');

  const [ratings, setRatings] = useState(
    pastOrders.reduce((acc, order) => {
      acc[order.id] = order.initialRating;
      return acc;
    }, {} as Record<string, number>)
  );

  const handleRatingChange = (orderId: string, restaurantName: string, newRating: number) => {
    setRatings(prev => ({ ...prev, [orderId]: newRating }));
    toast.success(`Thanks for rating your order from ${restaurantName}!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Order Tracker */}
            <section>
              <OrderTracker initialStatus="CONFIRMED" />
            </section>

            {/* Past Orders History */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Your Order History</h2>
              <Accordion type="single" collapsible className="w-full bg-background rounded-lg border">
                {pastOrders.map((order) => (
                  <AccordionItem key={order.id} value={order.id}>
                    <AccordionTrigger className="px-6 hover:no-underline">
                      <div className="flex justify-between w-full pr-4">
                        <div>
                          <p className="font-semibold text-left">{order.restaurantName}</p>
                          <p className="text-sm text-muted-foreground text-left">{order.date}</p>
                        </div>
                        <div className="text-right">
                           <p className="font-semibold">${order.total}</p>
                           <Badge variant="secondary">{order.status}</Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <ul className="list-disc list-inside text-muted-foreground mb-4">
                        {order.items.map(item => <li key={item}>{item}</li>)}
                      </ul>
                      <Separator className="my-4" />
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                         <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">Rate this order:</p>
                            <StarRatingDisplay 
                              interactive={true} 
                              rating={ratings[order.id] || 0}
                              onRatingChange={(newRating) => handleRatingChange(order.id, order.restaurantName, newRating)}
                            />
                         </div>
                        <Button variant="outline">Reorder</Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          {/* Sidebar with Order Summary */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>From {currentOrder.restaurantName}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {currentOrder.items.map(item => (
                    <li key={item.name} className="flex justify-between">
                      <span className="text-muted-foreground">{item.quantity}x {item.name}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${currentOrder.subtotal.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery Fee</span>
                        <span>${currentOrder.deliveryFee.toFixed(2)}</span>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${currentOrder.total.toFixed(2)}</span>
                </div>
                 <Button className="w-full mt-6">Need Help?</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderStatusTrackingPage;