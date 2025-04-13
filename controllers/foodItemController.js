const FoodItem = require('../models/FoodItem');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const multerStorageCloudinary = require('multer-storage-cloudinary');  // Ensure correct import
const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'restaurant-takeaway-images',  // Specify the Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png'],  // Allowed image formats
  },
});
const upload = multer({ storage });


// Create a new food item
// Create a new food item with image upload to Cloudinary
exports.createFoodItem = async (req, res) => {
  // First, handle the image upload
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Image upload failed', message: err.message });
    }

    const { name, description, price, category, isVisible } = req.body;
    const imageURL = req.file.path;  // Cloudinary image URL


    // if (!name || !description || !price || !category || !imageURL) {
    //   return res.status(400).json({ error: 'All fields are required' });
    // }


    try {
      // Create a new food item with the image URL from Cloudinary
      const newFoodItem = new FoodItem({
        name,
        description,
        price,
        category,
        imageURL,
        isVisible,
      });

      // Save the food item in the database
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

// Update an existing food item by ID with optional image upload
exports.updateFoodItem = async (req, res) => {
  // First, handle the image upload
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Image upload failed', message: err.message });
    }

    const { itemId } = req.params;
    const { name, description, price, category, isVisible } = req.body;

    // If an image was uploaded, get its URL
    const imageURL = req.file ? req.file.path : undefined;

    // Build update data object
    const updateData = {
      name,
      description,
      price,
      category,
      isVisible,
    };

    // Conditionally add imageURL only if a new image was uploaded
    if (imageURL) {
      updateData.imageURL = imageURL;
    }

    try {
      const updatedFoodItem = await FoodItem.findByIdAndUpdate(
        itemId,
        updateData,
        { new: true }
      );

      if (!updatedFoodItem) {
        return res.status(404).json({ error: 'Food item not found' });
      }

      console.log("-----Updated Data:------");
      console.log(updatedFoodItem);

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
