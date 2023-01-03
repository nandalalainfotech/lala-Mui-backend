import mongoose from 'mongoose'; 
import subCategoryMaster from './categorysubMasterModel.js';

const categoryMasterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    checked: { type: Boolean, required: true },
    parent: { type: String, required: false },
    description: { type: String, required: false },
    coverimg: { type: String, required: false },
    catThumbnail: { type: String, required: false },
    menuThumbnail: { type: String, required: false },
    children : {type: [subCategoryMaster.categoryMasterSchema],default:[]},
  },
  {
    timestamps: true,
  },
);

const CategoryMaster = mongoose.model('CategoryMaster', categoryMasterSchema);

export default CategoryMaster;