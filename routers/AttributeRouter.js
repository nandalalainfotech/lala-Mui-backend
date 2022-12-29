import express from "express";
import expressAsyncHandler from "express-async-handler";
import Attribute from "../Models/AttributeModule.js";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";

const AttributeRouter = express.Router();

AttributeRouter.get("/Attributemaster",expressAsyncHandler(async (req, res) => {
    const Attributelist = await Attribute.find();
    if (Attributelist) {
        res.send(Attributelist);
    } else {
        res.status(404).send({ message: 'Attributelist Not Found' });
    }
    })
  );

  AttributeRouter.put("/:id", isAuth, isSeller,isAdmin,isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
      const attributeId = req.params.id;
      const attributeupdate = await Attribute.findById(attributeId);
      if (attributeupdate) {
        attributeupdate.attributename = req.body.attributename;
        attributeupdate.attributetype =req.body.attributetype
        const updatedAttribute = await attributeupdate.save();
        res.send({ message: " Updated", attribute: updatedAttribute });
      } else {
        res.status(404).send({ message: "Product Not Found" });
      }
    })
  );

AttributeRouter.post(
  "/",
  isAuth,
  isSeller,
  isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const category = new Attribute({
        attributename: req.body.name,
      attributetype: req.body.attributestype,
    });
     const createdCategory = await category.save();
     res.send({ message: 'Product Created', category: createdCategory });
  })
);


AttributeRouter.delete("/:id",expressAsyncHandler(async (req, res) => {
    const deleteAttribute = await Attribute.findById(req.params.id);
    if (deleteAttribute) {
      const deleteattributed = await deleteAttribute.remove();
      console.log("deleteattributed",deleteattributed);
      res.send({ message: "Attributed Deleted", deleteAtt: deleteattributed });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default AttributeRouter;
