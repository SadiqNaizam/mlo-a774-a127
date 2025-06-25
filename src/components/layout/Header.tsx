import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { UtensilsCrossed, MapPin, User, ShoppingCart } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');
  const cartItemCount = 3; // Placeholder value

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-4">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline-block">FoodDash</span>
        </Link>

        {/* Location Search */}
        <div className="relative flex-1 max-w-sm">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Enter your location..." className="pl-10" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/user-profile/-authentication">
              <User className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            {/* The cart would likely link to the checkout page */}
            <Link to="/checkout">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
              <span className="sr-only">Open Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;