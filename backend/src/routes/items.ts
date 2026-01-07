// backend/src/routes/items.ts
import express from 'express';
import { ItemController } from '../controllers/itemController';

const router = express.Router();
const itemController = new ItemController();

// GET /items - Get all items sorted by createdAt descending
router.get('/', itemController.getAllItems);

// POST /items - Add new item
router.post('/', itemController.createItem);

// PUT /items/:id - Update bought status
router.put('/:id', itemController.updateItem);

// DELETE /items/:id - Delete item
router.delete('/:id', itemController.deleteItem);

export default router;
