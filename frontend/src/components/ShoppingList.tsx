import { Trash2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { useShoppingStore } from '../store/useShoppingStore';

export function ShoppingList() {
  const { items, isLoading, toggleBought, deleteItem } = useShoppingStore();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">
            Your shopping list is empty. Add your first item above!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card key={item._id}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={item.bought}
                onCheckedChange={(checked) =>
                  toggleBought(item._id, checked as boolean)
                }
              />
              <span
                className={`flex-1 ${
                  item.bought ? 'line-through opacity-60' : ''
                }`}
              >
                {item.name}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteItem(item._id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
