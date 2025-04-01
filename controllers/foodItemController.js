const FoodItem = require('../models/FoodItem');

// Create a new food item
exports.createFoodItem = async (req, res) => {
  const { name, description, price, category, imageURL, isVisible } = req.body;

  try {
    const newFoodItem = new FoodItem({
      name,
      description,
      price,
      category,
      imageURL,
      isVisible,
    });
    
    await newFoodItem.save();
    res.status(201).json({ message: 'Food item created successfully', data: newFoodItem });
  } catch (err) {
    res.status(400).json({ error: 'Error creating food item', message: err.message });
  }
};

// Get a single food item by ID
exports.getOneFoodItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const foodItem = await FoodItem.findById(itemId);
    if (!foodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.status(200).json({ data: foodItem });
  } catch (err) {
    res.status(400).json({ error: 'Error fetching food item', message: err.message });
  }
};

// Get all food items
exports.getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json({ data: foodItems });
  } catch (err) {
    res.status(400).json({ error: 'Error fetching food items', message: err.message });
  }
};

// Update an existing food item by ID
exports.updateFoodItem = async (req, res) => {
  const { itemId } = req.params;
  const { name, description, price, category, imageURL, isVisible } = req.body;

  try {
    const updatedFoodItem = await FoodItem.findByIdAndUpdate(
      itemId,
      { name, description, price, category, imageURL, isVisible },
      { new: true }
    );
    if (!updatedFoodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item updated successfully', data: updatedFoodItem });
  } catch (err) {
    res.status(400).json({ error: 'Error updating food item', message: err.message });
  }
};

// Delete a food item by ID
exports.deleteFoodItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const deletedFoodItem = await FoodItem.findByIdAndDelete(itemId);
    if (!deletedFoodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting food item', message: err.message });
  }
};
