import React, { useState, useEffect } from 'react';
import { Search, Utensils } from 'lucide-react';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard, { RestaurantCardProps } from '@/components/RestaurantCard';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// Placeholder data for restaurants
const sampleRestaurants: RestaurantCardProps[] = [
  {
    slug: 'the-pizza-place',
    name: 'The Pizza Place',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    cuisineTags: ['Pizza', 'Italian', 'Fast Food'],
    rating: 4.5,
    deliveryTime: '25-35 min',
  },
  {
    slug: 'burger-joint',
    name: 'Burger Joint',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    cuisineTags: ['Burgers', 'American', 'Fries'],
    rating: 4.2,
    deliveryTime: '20-30 min',
  },
  {
    slug: 'sushi-heaven',
    name: 'Sushi Heaven',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800&auto=format&fit=crop',
    cuisineTags: ['Sushi', 'Japanese', 'Seafood'],
    rating: 4.8,
    deliveryTime: '35-45 min',
  },
  {
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=800&auto=format&fit=crop',
    cuisineTags: ['Tacos', 'Mexican', 'Spicy'],
    rating: 4.6,
    deliveryTime: '20-25 min',
  },
   {
    slug: 'veggie-delight',
    name: 'Veggie Delight',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    cuisineTags: ['Vegetarian', 'Healthy', 'Salads'],
    rating: 4.9,
    deliveryTime: '30-40 min',
  },
  {
    slug: 'pho-king',
    name: 'Pho King',
    imageUrl: 'https://images.unsplash.com/photo-1585523444262-b9115f5ac142?q=80&w=800&auto=format&fit=crop',
    cuisineTags: ['Vietnamese', 'Noodles', 'Soup'],
    rating: 4.7,
    deliveryTime: '30-40 min',
  },
];

const cuisineCategories = ['All', 'Pizza', 'Burgers', 'Sushi', 'Mexican', 'Vegetarian', 'Chinese'];

const HomepageRestaurantListingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('HomepageRestaurantListingPage loaded');
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const RestaurantSkeleton = () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 pt-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Search Section */}
        <section className="bg-muted/20 py-12 md:py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Find your next meal</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                    Discover the best local restaurants and get your food delivered to your doorstep.
                </p>
                <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search restaurants or cuisines..." className="w-full h-12 pl-12 pr-28 rounded-full shadow-sm" />
                    <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 rounded-full px-6">Search</Button>
                </div>
            </div>
        </section>

        {/* Cuisine Categories Section */}
        <section className="py-8">
            <div className="container mx-auto px-4">
                 <div className="flex items-center gap-2 mb-4">
                    <Utensils className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Or browse by category</h2>
                 </div>
                <div className="flex flex-wrap gap-2">
                    {cuisineCategories.map(category => (
                        <Button key={category} variant={category === 'All' ? 'default' : 'outline'}>
                            {category}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Restaurant Listing Section */}
        <section className="py-8 bg-muted/20">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Restaurants</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, index) => <RestaurantSkeleton key={index} />)
                    ) : (
                        sampleRestaurants.map(restaurant => (
                            <RestaurantCard key={restaurant.slug} {...restaurant} />
                        ))
                    )}
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default HomepageRestaurantListingPage;