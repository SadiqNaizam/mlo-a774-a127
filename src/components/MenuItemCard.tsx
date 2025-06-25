import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ id, name, description, price, imageUrl }) => {
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    console.log(`MenuItemCard loaded for: ${name}`);
  }, [name]);

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of ${name} (ID: ${id}) to cart for a total of $${(price * quantity).toFixed(2)}`);
    toast.success(`${quantity} x ${name} added to your cart!`);
    setIsDialogOpen(false); // Close the dialog
  };

  // Reset quantity to 1 when dialog is closed
  useEffect(() => {
    if (!isDialogOpen) {
      setQuantity(1);
    }
  }, [isDialogOpen]);

  return (
    <div className="flex gap-4 p-4 border-b w-full">
      <div className="flex-1 space-y-1">
        <h3 className="font-bold text-base">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <p className="font-semibold text-sm pt-1">${price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-end justify-between">
        <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
          <img
            src={imageUrl || 'https://via.placeholder.com/150'}
            alt={name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2">
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(q => q + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleAddToCart} className="w-full sm:w-auto">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart - ${(price * quantity).toFixed(2)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MenuItemCard;