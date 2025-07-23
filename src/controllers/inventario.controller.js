import Inventario from '../models/inventario.model.js';

export const getInventario = async (req, res) => {
  try {
    const inventario = await Inventario.find();
    res.status(200).json(inventario);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory', error: err.message });
  }
};

export const createInventarioItem = async (req, res) => {
  const { nombre, cantidad, descripcion, imagen } = req.body; // <-- agrega imagen

  try {
    const nuevoItem = new Inventario({ nombre, cantidad, descripcion, imagen });
    await nuevoItem.save();
    res.status(201).json(nuevoItem);
  } catch (err) {
    res.status(400).json({ message: 'Error creating inventory item', error: err.message });
  }
};

export const updateInventarioItem = async (req, res) => {
  const { id } = req.params;
  const { nombre, cantidad, descripcion } = req.body;

  try {
    const itemActualizado = await Inventario.findByIdAndUpdate(id, { nombre, cantidad, descripcion }, { new: true });
    if (!itemActualizado) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(200).json(itemActualizado);
  } catch (err) {
    res.status(400).json({ message: 'Error updating inventory item', error: err.message });
  }
};

export const deleteInventarioItem = async (req, res) => {
  const { id } = req.params;

  try {
    const itemEliminado = await Inventario.findByIdAndDelete(id);
    if (!itemEliminado) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting inventory item', error: err.message });
  }
};
export const getInventarioBajoStock = async (req, res) => {
  const min = parseInt(req.params.min, 10) || 5;
  try {
    const items = await Inventario.find({ cantidad: { $lte: min } });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching low stock items', error: err.message });
  }
};
export const actualizarImagenInventario = async (req, res) => {
  const { imagen } = req.body;
  try {
    const item = await Inventario.findByIdAndUpdate(
      req.params.id,
      { imagen },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Error updating image', error: err.message });
  }
};