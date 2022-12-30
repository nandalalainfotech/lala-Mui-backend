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


  FeaturesRouter.put("/:id", isAuth, isSeller,isAdmin,isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const FeaturesId = req.params.id;
    const Featuresupdate = await Features.findById(FeaturesId);
    if (Featuresupdate) {
      Featuresupdate.featurename = req.body.featurename;
      const updatedFeatures = await Featuresupdate.save();
      res.send({ message: " Updated", Features: updatedFeatures });
    } else {
      res.status(404).send({ message: "Product Not Found" });
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

FeaturesRouter.delete("/:id",expressAsyncHandler(async (req, res) => {
  const deleteAttribute = await Features.findById(req.params.id);
  if (deleteAttribute) {
    const deleteattributed = await deleteAttribute.remove();
    res.send({ message: "Attributed Deleted", deleteAtt: deleteattributed });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
})
);

export default FeaturesRouter;
