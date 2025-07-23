import express from 'express';
import { getInventario, createInventarioItem, updateInventarioItem, deleteInventarioItem } from '../controllers/inventario.controller.js';

const router = express.Router();

// GET /api/inventario - Fetch all inventory items
router.get('/', getInventario);

// POST /api/inventario - Create a new inventory item
router.post('/', createInventarioItem);

// PUT /api/inventario/:id - Update an inventory item by ID
router.put('/:id', updateInventarioItem);

// DELETE /api/inventario/:id - Delete an inventory item by ID
router.delete('/:id', deleteInventarioItem);

// ...existing code...
router.get('/bajo-stock/:min', getInventarioBajoStock);

// ...existing code...
router.patch('/:id/imagen', actualizarImagenInventario);
// ...existing code...
export default router;