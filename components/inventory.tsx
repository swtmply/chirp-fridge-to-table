"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useIngredientStore } from "@/lib/store/ingredients";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function PantryInventory() {
  const [newItem, setNewItem] = useState("");
  const { addIngredient, removeIngredient, ingredients } = useIngredientStore(
    (state) => state
  );

  return (
    <Card className="w-full max-w-md mt-8">
      <CardHeader>
        <CardTitle>Pantry Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            setNewItem("");

            addIngredient({
              id: ingredients.length.toString(),
              name: newItem,
              quantity: 0,
              unit: "",
            });
          }}
          className="flex gap-2 mb-4"
        >
          <Input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add an item..."
            aria-label="Add an item to your pantry inventory"
          />
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add item</span>
          </Button>
        </form>
        <ul className="space-y-2">
          {ingredients.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-secondary p-2 rounded-md"
            >
              <span>{item.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeIngredient(item.id)}
                aria-label={`Remove ${item}`}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
        {ingredients.length === 0 && (
          <p className="text-center text-muted-foreground">
            Your pantry is empty. Add some items!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
