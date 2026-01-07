// backend/src/repositories/itemRepository.ts
import Item, { IItemDocument } from '../models/Item';

export class ItemRepository {
  async findAll(): Promise<IItemDocument[]> {
    return await Item.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<IItemDocument | null> {
    return await Item.findById(id);
  }

  async create(name: string): Promise<IItemDocument> {
    const newItem = new Item({
      name: name.trim(),
      bought: false,
    });
    return await newItem.save();
  }

  async updateBoughtStatus(id: string, bought: boolean): Promise<IItemDocument | null> {
    return await Item.findByIdAndUpdate(
      id,
      { bought },
      { new: true }
    );
  }

  async delete(id: string): Promise<IItemDocument | null> {
    return await Item.findByIdAndDelete(id);
  }
}
