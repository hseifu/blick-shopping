// backend/src/controllers/itemController.ts
import { Request, Response } from 'express';
import { ItemService } from '../services/itemService';

export class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  getAllItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.itemService.getAllItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Server error fetching items' });
    }
  };

  createItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;
      const newItem = await this.itemService.createItem(name);
      res.status(201).json(newItem);
    } catch (error) {
      if (error instanceof Error && error.message === 'Item name is required and cannot be empty') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Server error creating item' });
      }
    }
  };

  updateItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { bought } = req.body;
      const updatedItem = await this.itemService.updateItemBoughtStatus(id, bought);
      res.json(updatedItem);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Item not found') {
          res.status(404).json({ message: error.message });
        } else if (error.message === 'Bought must be a boolean') {
          res.status(400).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'Server error updating item' });
        }
      } else {
        res.status(500).json({ message: 'Server error updating item' });
      }
    }
  };

  deleteItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedItem = await this.itemService.deleteItem(id);
      res.json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
      if (error instanceof Error && error.message === 'Item not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Server error deleting item' });
      }
    }
  };
}
