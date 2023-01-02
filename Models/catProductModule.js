import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    prodname: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    fileId: { type: mongoose.Schema.Types.ObjectID, ref: "Image" },
    imageId: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    feature: { type: String, required: true },
    brand: { type: String, required: true },
    search: { type: String, required: true },
    reference: { type: String, required: true },
    quantity: { type: String, required: true },
    taxexcluded: { type: String, required: true },
    taxincluded: { type: String, default: false },
  },
  {
    timestamps: true,
  }
);

const CatlogProduct = mongoose.model("CatlogProduct", productSchema);

export default CatlogProduct;