import mongoose from 'mongoose';
const categoryMasterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    checked: { type: Boolean, required: true },
    parent: { type: String, required: true },
    description: { type: String, required: false },
    coverimg: { type: String, required: false },
    catThumbnail: { type: String, required: false },
    menuThumbnail: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

const CategoryMaster = mongoose.model('CategoryMaster', categoryMasterSchema);

export default CategoryMaster;