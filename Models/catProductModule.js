import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    prodname: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    fileId: { type: mongoose.Schema.Types.ObjectID, ref: "Image" },
    imageId: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    featureId: { type: String, required: true },
    featurestypevalue: { type: String, required: true },
    brand: { type: String, required: true },
    search: { type: String, required: true },
    reference: { type: String, required: true },
    combination:  { type: String, required: false },
    quantity: { type: String, required: true },
    taxexcluded: { type: String, required: true },
    taxincluded: { type: String, default: false },
    qty: { type: String, required: false },
    mqty: { type: String, required: false },
    SLocation: { type: String, required: false },
    stockin: { type: String, required: false },
    stockout: { type: String, required: false },
    date: { type: Date, required: false },
    height: { type: String, default: false },
    width: { type: String, default: false },
    depth: { type: String, default: false },
    weight: { type: String, default: false },
  },
  {
    timestamps: true,
  }
);

const CatlogProduct = mongoose.model("CatlogProduct", productSchema);

export default CatlogProduct;
