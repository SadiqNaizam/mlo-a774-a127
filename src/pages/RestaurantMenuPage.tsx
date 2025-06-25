import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';
import StarRatingDisplay from '@/components/StarRatingDisplay';

// Import shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';

// Import Icons
import { Clock, ShoppingCart, Trash2 } from 'lucide-react';

// --- Placeholder Data ---

const restaurantData = {
  name: 'The Golden Spoon',
  logoUrl: 'https://i.pravatar.cc/150?u=golden-spoon',
  rating: 4.5,
  reviewCount: 1234,
  deliveryTime: '25-35 min',
  cuisine: 'Modern American',
};

const menuItems = {
  appetizers: [
    { id: 1, name: 'Crispy Calamari', description: 'Served with a spicy marinara sauce and lemon aioli.', price: 14.50, imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=400' },
    { id: 2, name: 'Avocado Toast', description: 'Smashed avocado on toasted sourdough with red pepper flakes.', price: 11.00, imageUrl: 'https://images.unsplash.com/photo-1484723051597-626151586e56?q=80&w=400' },
  ],
  mainCourses: [
    { id: 3, name: 'Classic Cheeseburger', description: 'A juicy beef patty with cheddar cheese, lettuce, tomato, and our special sauce.', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400' },
    { id: 4, name: 'Grilled Salmon', description: 'Freshly grilled salmon served with asparagus and roasted potatoes.', price: 26.50, imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400' },
    { id: 5, name: 'Margherita Pizza', description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.', price: 20.00, imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=400' },
  ],
  desserts: [
    { id: 6, name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.', price: 9.50, imageUrl: 'https://images.unsplash.com/photo-1586985289936-76a02a83f124?q=80&w=400' },
  ],
};

// Simple type for cart items
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const RestaurantMenuPage = () => {
  useEffect(() => {
    console.log('RestaurantMenuPage loaded');
  }, []);

  // Placeholder state for cart functionality demonstration in the Sheet
  const [cart, setCart] = useState<CartItem[]>([
    { id: 3, name: 'Classic Cheeseburger', price: 18.00, quantity: 1 },
    { id: 5, name: 'Margherita Pizza', price: 20.00, quantity: 2 },
  ]);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        <div className="container py-6 md:py-10">
          {/* --- Breadcrumbs --- */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{restaurantData.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* --- Restaurant Header --- */}
          <section className="flex flex-col sm:flex-row items-start gap-6 mt-6 pb-8 border-b">
            <Avatar className="w-24 h-24 border">
              <AvatarImage src={restaurantData.logoUrl} alt={restaurantData.name} />
              <AvatarFallback>{restaurantData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{restaurantData.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <StarRatingDisplay rating={restaurantData.rating} size={18} />
                  <span>{restaurantData.rating.toFixed(1)} ({restaurantData.reviewCount.toLocaleString()} ratings)</span>
                </div>
                <span className="hidden sm:inline">·</span>
                <span>{restaurantData.cuisine}</span>
                <span className="hidden sm:inline">·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{restaurantData.deliveryTime}</span>
                </div>
              </div>
            </div>
          </section>

          {/* --- Menu List --- */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            <div className="space-y-8">
              {Object.entries(menuItems).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold mb-4 capitalize border-b pb-2">{category}</h3>
                  <div className="flex flex-col divide-y">
                    {items.map((item) => (
                      <MenuItemCard key={item.id} {...item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* --- Sticky Cart Trigger & Sheet --- */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-6 right-6 h-14 w-auto px-6 rounded-full shadow-lg text-base">
            <ShoppingCart className="mr-3 h-5 w-5" />
            View Cart
            {totalCartItems > 0 && (
              <Badge variant="destructive" className="ml-3 rounded-full h-6 w-6 flex items-center justify-center">
                {totalCartItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>Review items before proceeding to checkout.</SheetDescription>
          </SheetHeader>
          {cart.length > 0 ? (
            <>
              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="flex flex-col gap-4 py-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center gap-4">
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <div className="text-right font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <SheetFooter className="mt-auto pt-4 border-t">
                <div className="w-full space-y-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                   <SheetClose asChild>
                    <Button asChild size="lg" className="w-full">
                       <Link to="/checkout">Proceed to Checkout</Link>
                    </Button>
                   </SheetClose>
                </div>
              </SheetFooter>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/50" />
              <p className="font-semibold">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some delicious items from the menu!</p>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;