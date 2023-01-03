import mongoose from 'mongoose'; 
const thirdCategorySchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      checked: { type: Boolean, required: true },
      parent: { type: String, required: false },
      description: { type: String, required: false },
      coverimg: { type: String, required: false },
      catThumbnail: { type: String, required: false },
      menuThumbnail: { type: String, required: false },
    },
    {
      timestamps: true,
    },
  );
  
  const ThirdCategoryMaster = mongoose.model('ThirdCategoryMaster', thirdCategorySchema);
  
  export default ThirdCategoryMaster;