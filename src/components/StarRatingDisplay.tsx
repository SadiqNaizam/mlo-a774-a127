import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StarRatingDisplayProps {
  /** The rating value to display (e.g., 4.5) */
  rating: number;
  /** The total number of stars to display */
  totalStars?: number;
  /** The size of the star icons in pixels */
  size?: number;
  /** If true, the component allows users to select a rating */
  interactive?: boolean;
  /** Callback function when the rating is changed by the user */
  onRatingChange?: (rating: number) => void;
  /** Optional CSS classes for the container */
  className?: string;
}

const StarRatingDisplay: React.FC<StarRatingDisplayProps> = ({
  rating,
  totalStars = 5,
  size = 20,
  interactive = false,
  onRatingChange,
  className,
}) => {
  console.log('StarRatingDisplay loaded');

  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  useEffect(() => {
    // Sync with parent prop if not currently hovering
    if (hoverRating === 0) {
      setCurrentRating(rating);
    }
  }, [rating, hoverRating]);

  const handleMouseEnter = (starValue: number) => {
    if (!interactive) return;
    setHoverRating(starValue);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(0);
  };

  const handleClick = (starValue: number) => {
    if (!interactive) return;
    setCurrentRating(starValue);
    if (onRatingChange) {
      onRatingChange(starValue);
    }
  };

  const displayRating = interactive ? (hoverRating || currentRating) : rating;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFull = displayRating >= starValue;
        const isHalf = !isFull && displayRating >= starValue - 0.5;

        const starElement = (
          <div
            key={starValue}
            className={cn("relative", interactive && "cursor-pointer")}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
            style={{ width: size, height: size }}
            aria-label={interactive ? `Rate ${starValue} star${starValue > 1 ? 's' : ''}` : `${rating} out of ${totalStars} stars`}
          >
            {/* Background empty star */}
            <Star
              className="absolute top-0 left-0 text-gray-300 dark:text-gray-600"
              fill="currentColor"
              strokeWidth={1.5}
              style={{ width: size, height: size }}
            />
            {/* Filled portion (full or half) */}
            {(isFull || isHalf) && (
              <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: isFull ? '100%' : '50%' }}
              >
                <Star
                  className={cn(
                    "absolute top-0 left-0",
                    interactive && hoverRating > 0 ? "text-yellow-400" : "text-yellow-500"
                  )}
                  fill="currentColor"
                  strokeWidth={1.5}
                  style={{ width: size, height: size }}
                />
              </div>
            )}
          </div>
        );
        
        if (interactive) {
          return (
            <Tooltip key={starValue} delayDuration={100}>
              <TooltipTrigger asChild>{starElement}</TooltipTrigger>
              <TooltipContent>
                <p>{starValue} Star{starValue > 1 ? 's' : ''}</p>
              </TooltipContent>
            </Tooltip>
          );
        }

        return starElement;
      })}
    </div>
  );
};

export default StarRatingDisplay;