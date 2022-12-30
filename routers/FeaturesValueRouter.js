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

  FeaturesValueRouter.put("/:id", isAuth, isSeller,isAdmin,isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const FeaturesId = req.params.id;
    const Featuresupdate = await FeaturesValue.findById(FeaturesId);
    if (Featuresupdate) {
      Featuresupdate.featurevalue= req.body.featurevalue;
      Featuresupdate.featuretype= req.body.featuretype;
      const updatedFeatures = await Featuresupdate.save();
      res.send({ message: " Updated", Features: updatedFeatures });
    } else {
      res.status(404).send({ message: "Product Not Found" });
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

  FeaturesValueRouter.delete("/:id",expressAsyncHandler(async (req, res) => {
    const deleteAttribute = await FeaturesValue.findById(req.params.id);
    if (deleteAttribute) {
      const deleteattributed = await deleteAttribute.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deleteattributed });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
  );

  export default FeaturesValueRouter;