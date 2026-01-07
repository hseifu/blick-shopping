import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Alert, AlertDescription } from './components/ui/alert';
import { AddItemForm } from './components/AddItemForm';
import { ShoppingList } from './components/ShoppingList';
import { useShoppingStore } from './store/useShoppingStore';

function App() {
  const { fetchItems, error } = useShoppingStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Shopping List</CardTitle>
            <CardDescription>
              Manage your shopping items - add, check off, and delete as needed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <AddItemForm />

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <ShoppingList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
