import mongoose from "mongoose";

const AttributeSchema = new mongoose.Schema(
  {
    attributename: { type: String, required: true, },
    attributetype: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Attribute = mongoose.model("Attribute", AttributeSchema);

export default Attribute;
