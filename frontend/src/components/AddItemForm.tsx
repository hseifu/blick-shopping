import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useShoppingStore } from '../store/useShoppingStore';

export function AddItemForm() {
  const [name, setName] = useState('');
  const [localError, setLocalError] = useState('');
  const addItem = useShoppingStore((state) => state.addItem);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!name.trim()) {
      setLocalError('Please enter an item name');
      return;
    }

    try {
      await addItem(name);
      setName('');
    } catch (error) {
      setLocalError((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter item name (e.g., Butter)"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setLocalError('');
          }}
          className="flex-1"
        />
        <Button type="submit" disabled={!name.trim()}>
          Add Item
        </Button>
      </div>
      {localError && (
        <p className="text-sm text-destructive">{localError}</p>
      )}
    </form>
  );
}
