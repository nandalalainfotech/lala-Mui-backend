import express from "express";
import expressAsyncHandler from "express-async-handler";
import Features from "../Models/FeaturesModel.js";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";

const FeaturesRouter = express.Router();


FeaturesRouter.get("/Flist",expressAsyncHandler(async (req, res) => {
    const Featurelist = await Features.find();
    if (Featurelist) {
        res.send(Featurelist);
    } else {
        res.status(404).send({ message: 'Featurelist Not Found' });
    }
    })
  );


FeaturesRouter.post(
  "/",
  isAuth,
  isSeller,
  isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const feature = new Features({
      featurename: req.body.Featurename,
    });
    const featureCategory = await feature.save();
    res.send({ message: "Product Created", feature: featureCategory });
  })
);

export default FeaturesRouter;
