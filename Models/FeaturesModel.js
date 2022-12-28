import mongoose from "mongoose";
const FeaturesSchema = new mongoose.Schema(
  {
    featurename: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Features = mongoose.model("Features", FeaturesSchema);

export default Features;
