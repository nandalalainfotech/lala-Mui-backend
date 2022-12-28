import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";
import upload from "../middleware/image.js";
import AttributeValue from "../Models/AttributeValueModel.js";

const AttributeValueRouter = express.Router();

AttributeValueRouter.get("/Attributevalue",expressAsyncHandler(async (req, res) => {
    const Attributelist = await AttributeValue.find();
    console.log("Attributelist",Attributelist);
    if (Attributelist) {
        res.send(Attributelist);
    } else {
        res.status(404).send({ message: 'Attributelist Not Found' });
    }
    })
  );

AttributeValueRouter.post(
  "/",
  isAuth,
  upload.single("image"),
  async (req, res) => {
    const AttriValue = new AttributeValue({
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      path: req.file.path,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      filename: req.file.filename,
      attributeVlaue: req.body.attributeVlaue,
      value: req.body.value,
      color: req.body.color,
    });
    const AttriValueUploaded = await AttriValue.save();
    console.log("req====>>", AttriValueUploaded);
    res.send({ message: "image Uploaded", image: AttriValueUploaded });
  }
);

export default AttributeValueRouter;
