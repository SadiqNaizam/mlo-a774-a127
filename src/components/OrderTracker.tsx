import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, ChefHat, Bike, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils.ts exists for cn function

// Define the possible statuses for an order
type OrderStatus = 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';

interface OrderTrackerProps {
  // In a real app, this would be passed down and updated via websockets or polling
  initialStatus?: OrderStatus;
}

const steps = [
  {
    name: 'Confirmed',
    status: 'CONFIRMED' as OrderStatus,
    icon: CheckCircle2,
    description: 'Your order has been confirmed by the restaurant.',
  },
  {
    name: 'Preparing',
    status: 'PREPARING' as OrderStatus,
    icon: ChefHat,
    description: 'The chef is preparing your delicious meal.',
  },
  {
    name: 'Out for Delivery',
    status: 'OUT_FOR_DELIVERY' as OrderStatus,
    icon: Bike,
    description: 'Your order is on its way to you!',
  },
  {
    name: 'Delivered',
    status: 'DELIVERED' as OrderStatus,
    icon: PackageCheck,
    description: 'Enjoy your meal! Your order has been delivered.',
  },
];

const OrderTracker: React.FC<OrderTrackerProps> = ({ initialStatus = 'CONFIRMED' }) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(initialStatus);

  console.log('OrderTracker loaded');

  // SIMULATION: This useEffect simulates the order progressing through the stages.
  // In a real application, this logic would be replaced by data from an API.
  useEffect(() => {
    const statusOrder: OrderStatus[] = ['CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    const currentIndex = statusOrder.indexOf(currentStatus);

    if (currentIndex < statusOrder.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatus(statusOrder[currentIndex + 1]);
      }, 5000); // Advance to the next stage every 5 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [currentStatus]);

  const currentStepIndex = steps.findIndex(step => step.status === currentStatus);
  const currentStepDetails = steps[currentStepIndex];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Track Your Order</CardTitle>
        <CardDescription>
          Status: <span className="font-semibold text-primary">{currentStepDetails.name}</span> - {currentStepDetails.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8 pb-4">
        <div className="flex items-center justify-between relative">
          {/* Progress Bar Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;

            return (
              <div key={step.status} className="z-10 flex flex-col items-center text-center w-24">
                <div
                  className={cn(
                    'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500',
                    isCompleted ? 'bg-primary border-primary' : 'bg-background',
                    isActive ? 'border-primary scale-110' : 'border-muted-foreground/50',
                  )}
                >
                  <step.icon
                    className={cn(
                      'h-6 w-6',
                      isCompleted ? 'text-primary-foreground' : 'text-muted-foreground',
                      isActive && 'text-primary',
                    )}
                  />
                </div>
                <p
                  className={cn(
                    'mt-2 text-sm font-medium',
                    isCompleted || isActive ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {step.name}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;