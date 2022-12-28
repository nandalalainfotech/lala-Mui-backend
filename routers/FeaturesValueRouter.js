import express from "express";
import expressAsyncHandler from "express-async-handler";
import FeaturesValue from "../Models/FeaturesValueModel.js";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";

const FeaturesValueRouter = express.Router();

FeaturesValueRouter.get("/Fvaluelist",expressAsyncHandler(async (req, res) => {
    const Featurelist = await FeaturesValue.find();
    if (Featurelist) {
        
        res.send(Featurelist);
    } else {
        res.status(404).send({ message: 'Featurelist Not Found' });
    }
    })
  );

FeaturesValueRouter.post(
    "/",
    isAuth,
    isSeller,
    isAdmin,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
      const feature = new FeaturesValue({
        featurevalue: req.body.Featurevalue,
        featuretype: req.body.Featuretype,
      });
      const featureCategory = await feature.save();
      res.send({ message: "Product Created", feature: featureCategory });
    })
  );
  
  export default FeaturesValueRouter;