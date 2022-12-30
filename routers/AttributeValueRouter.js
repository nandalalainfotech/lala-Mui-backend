import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";
import upload from "../middleware/image.js";
import AttributeValue from "../Models/AttributeValueModel.js";
import mongoose from "mongoose";
import Grid from "gridfs-stream";

const AttributeValueRouter = express.Router();

AttributeValueRouter.get(
  "/Attributevalue",
  expressAsyncHandler(async (req, res) => {
    const Attributelist = await AttributeValue.find();
    if (Attributelist) {
      res.send(Attributelist);
    } else {
      res.status(404).send({ message: "Attributelist Not Found" });
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
    res.send({ message: "image Uploaded", image: AttriValueUploaded });
  }
);

AttributeValueRouter.get(
  "/view/:filename",
  expressAsyncHandler(async (req, res) => {
    const filename = req.params.filename;
    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      var readstream = bucket.openDownloadStreamByName(filename);
      return readstream.pipe(res);
    });
  })
);

AttributeValueRouter.put(
  "/:id",
  isAuth,
  upload.single("image"),
  async (req, res) => {
    const brandUpdateId = req.params.id;
    const brandUpdate = await AttributeValue.findById(brandUpdateId);

    if (brandUpdate) {
      brandUpdate.value = req.body.value;
      brandUpdate.attributeVlaue = req.body.atteditType;
      brandUpdate.fieldname = req.file.fieldname;
      brandUpdate.originalname = req.file.originalname;
      brandUpdate.filename = req.file.filename;
      brandUpdate.mimetype = req.file.mimetype;
      const updatedBrand = await brandUpdate.save();
      res.send({ message: " Updated", newbrand: updatedBrand });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  }
);

AttributeValueRouter.delete("/:id",expressAsyncHandler(async (req, res) => {
  const deleteAttribute = await AttributeValue.findById(req.params.id);
  if (deleteAttribute) {
    const deleteattributed = await deleteAttribute.remove();
    res.send({ message: "Attributed Deleted", deleteAtt: deleteattributed });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
})
);

export default AttributeValueRouter;
