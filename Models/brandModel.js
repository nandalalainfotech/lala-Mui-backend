import mongoose from 'mongoose';
const brandSchema = new mongoose.Schema(
  
    {
      name: { type: String, required: true },
      editor: { type: String, required: true },
      ckeditor: { type: String, required: true },
      fieldname: { type: String, required: true },
      originalname: { type: String, required: true },
      path: { type: String, required: false },
      filename: { type: String, required: false },
      mimetype: { type: String, required: false },
      encoding: { type: String, required: false },
      flag: { type: Boolean, required: false },
    },
    {
      timestamps: true,
    },
  
  );
  
  
  
  
  const Brand = mongoose.model('Brand', brandSchema);
  
  export default Brand;