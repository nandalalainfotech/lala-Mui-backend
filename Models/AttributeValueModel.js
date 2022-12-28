import mongoose from "mongoose";

const AttributeValueSchema = new mongoose.Schema(

    {
        value: { type: String, required: true },
        color: { type: String, required: true },
        attributeVlaue: { type: String, required: true },
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

const AttributeValue = mongoose.model("AttributeValue", AttributeValueSchema);

export default AttributeValue;
