// backend/src/services/itemService.ts
import { ItemRepository } from '../repositories/itemRepository';
import { IItemDocument } from '../models/Item';

export class ItemService {
  private itemRepository: ItemRepository;

  constructor() {
    this.itemRepository = new ItemRepository();
  }

  async getAllItems(): Promise<IItemDocument[]> {
    return await this.itemRepository.findAll();
  }

  async createItem(name: string): Promise<IItemDocument> {
    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Item name is required and cannot be empty');
    }

    return await this.itemRepository.create(name);
  }

  async updateItemBoughtStatus(id: string, bought: boolean): Promise<IItemDocument> {
    // Validate bought parameter
    if (typeof bought !== 'boolean') {
      throw new Error('Bought must be a boolean');
    }

    const updatedItem = await this.itemRepository.updateBoughtStatus(id, bought);

    if (!updatedItem) {
      throw new Error('Item not found');
    }

    return updatedItem;
  }

  async deleteItem(id: string): Promise<IItemDocument> {
    const deletedItem = await this.itemRepository.delete(id);

    if (!deletedItem) {
      throw new Error('Item not found');
    }

    return deletedItem;
  }
}
