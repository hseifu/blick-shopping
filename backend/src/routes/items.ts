// backend/src/routes/items.ts
import express, { Request, Response } from "express";
import Item from "../models/Item";

const router = express.Router();

// GET /items - Get all items sorted by createdAt descending
router.get("/", async (req: Request, res: Response) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching items" });
  }
});

// POST /items - Add new item
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Validate name
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Item name is required and cannot be empty" });
    }

    const newItem = new Item({
      name: name.trim(),
      bought: false,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error creating item" });
  }
});

// PUT /items/:id - Update bought status
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { bought } = req.body;

    if (typeof bought !== "boolean") {
      return res.status(400).json({ message: "Bought must be a boolean" });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { bought },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error updating item" });
  }
});

// DELETE /items/:id - Delete item
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Server error deleting item" });
  }
});

export default router;
