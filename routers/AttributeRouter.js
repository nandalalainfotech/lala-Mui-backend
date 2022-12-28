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

export default AttributeRouter;
