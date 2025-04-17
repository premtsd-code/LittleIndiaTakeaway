const FoodItem = require('../models/FoodItem');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const multerStorageCloudinary = require('multer-storage-cloudinary');

// Configure multer storage with Cloudinary
const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'restaurant-takeaway-images',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});
const upload = multer({ storage });

// Create a new food item
exports.createFoodItem = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Image upload failed', message: err.message });
    }

    const { name, description, price, category, isVisible } = req.body;

    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        transformation: [
          { width: 200, height: 220, crop: "auto", gravity: "auto" }
        ]
      });

      const imageURL = result.secure_url;

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
  });
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

// Update an existing food item
exports.updateFoodItem = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Image upload failed', message: err.message });
    }

    const { itemId } = req.params;
    const { name, description, price, category, isVisible } = req.body;

    try {
      let imageURL;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          transformation: [
            { width: 200, height: 220, crop: "auto", gravity: "auto" }
          ]
        });

        imageURL = result.secure_url;
      }

      const updateData = {
        name,
        description,
        price,
        category,
        isVisible,
      };

      if (imageURL) {
        updateData.imageURL = imageURL;
      }

      const updatedFoodItem = await FoodItem.findByIdAndUpdate(
        itemId,
        updateData,
        { new: true }
      );

      if (!updatedFoodItem) {
        return res.status(404).json({ error: 'Food item not found' });
      }

      res.status(200).json({ message: 'Food item updated successfully', data: updatedFoodItem });
    } catch (err) {
      res.status(400).json({ error: 'Error updating food item', message: err.message });
    }
  });
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

// Bulk update visibility of food items
exports.bulkUpdateVisibility = async (req, res) => {
  try {
    const { updates } = req.body;

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ message: 'Invalid updates array' });
    }

    const bulkOps = updates.map(item => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { isVisible: item.isVisible } }
      }
    }));

    const result = await FoodItem.bulkWrite(bulkOps);

    return res.status(200).json({
      message: 'Visibility updated successfully',
      result
    });
  } catch (error) {
    console.error('Error in bulkUpdateVisibility:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
