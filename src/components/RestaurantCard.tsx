import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Clock } from 'lucide-react';

// Assuming StarRatingDisplay component exists as described in the project context.
// If it's not created yet, this import will need a real component.
import StarRatingDisplay from '@/components/StarRatingDisplay';

export interface RestaurantCardProps {
  slug: string;
  name: string;
  imageUrl: string;
  cuisineTags: string[];
  rating: number;
  deliveryTime: string; // e.g., "25-35 min"
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  slug,
  name,
  imageUrl,
  cuisineTags,
  rating,
  deliveryTime,
}) => {
  console.log('RestaurantCard loaded for:', name);

  // The route in App.tsx is `/restaurant -menu `. We will link to a dynamic version,
  // assuming the App.tsx will be updated to handle a slug, e.g., /restaurant-menu/:slug
  // For now, we clean up the path and add the slug.
  const restaurantLink = `/restaurant-menu/${slug}`;

  return (
    <Link to={restaurantLink} className="block group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
      <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Restaurant'}
              alt={`Image of ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </CardHeader>

        <CardContent className="p-4 flex flex-col flex-grow">
          <CardTitle className="text-xl font-bold tracking-tight mb-2 truncate group-hover:text-primary">
            {name}
          </CardTitle>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <StarRatingDisplay rating={rating} />
            <span className="text-gray-400" aria-hidden="true">•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{deliveryTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {cuisineTags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
            {cuisineTags.length > 3 && (
                <Badge variant="outline">+{cuisineTags.length - 3}</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;