import express from "express";
import expressAsyncHandler from "express-async-handler";
import CatlogProduct from "../Models/catProductModule.js";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";

const catProductRouter = express.Router();

catProductRouter.post("/", isAuth, async (req, res) => {
  const brand = new CatlogProduct({
    prodname: req.body.prodname,
    user: req.user._id,
    imageId: req.body.fileId,
    summary: req.body.summary.data,
    description: req.body.description.data,
    featureId: req.body.featureId,
    featurestypevalue: req.body.featurestypevalue,
    combination: req.body.combination,
    brand: req.body.brand,
    search: req.body.search,
    reference: req.body.reference,
    quantity: req.body.quantity,
    taxexcluded: req.body.taxexcluded,
    taxincluded: req.body.taxincluded,
    qty: req.body.qty,
    mqty: req.body.mqty,
    SLocation: req.body.SLocation,
    stockin: req.body.stockin,
    stockout: req.body.stockout,
    date: req.body.date,
    height: req.body.height,
    width: req.body.width,
    depth: req.body.depth,
    weight: req.body.weight,
  });
  const brandSaved = await brand.save();
  res.send({ message: "Product Created", product: brandSaved });
});

catProductRouter.get(
  "/allcatProduct",
  expressAsyncHandler(async (req, res) => {
    const catProd = await CatlogProduct.find();
    if (catProd) {
      res.send(catProd);
    } else {
      res.status(404).send({ message: "Catalog Product Not Found" });
    }
  })
);

catProductRouter.put(
  "/:id",
  isAuth,
  isSeller,
  isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const catProdId = req.params.id;
    const catProdUpdate = await CatlogProduct.findById(catProdId);

    if (catProdUpdate) {
      catProdUpdate.prodname = req.body.prodname;
      catProdUpdate.summary = req.body.summary;
      catProdUpdate.description = req.body.description;
      catProdUpdate.featureId = req.body.featureId;
      catProdUpdate.featurestypevalue = req.body.featurestypevalue;
      catProdUpdate.brand = req.body.brand;
      catProdUpdate.combination = req.body.combination;
      catProdUpdate.reference = req.body.reference;
      catProdUpdate.quantity = req.body.quantity;
      catProdUpdate.taxexcluded = req.body.taxexcluded;
      catProdUpdate.taxincluded = req.body.taxincluded;
      const updatedCatProd = await catProdUpdate.save();
      res.send({
        message: "Catalog Product Updated",
        catProdUpdate: updatedCatProd,
      });
    } else {
      res.status(404).send({ message: "Catalog Product Not Found" });
    }
  })
);

catProductRouter.put(
  "/wishlist/:id",
  isAuth,
  isSeller,
  isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const catProdId = req.params.id;
    const catProdUpdate = await CatlogProduct.findById(catProdId);

    if (catProdUpdate) {
      catProdUpdate.status = req.body.status;
      const updatedCatProd = await catProdUpdate.save();
      console.log("req====>>>", updatedCatProd);
      res.send({
        message: "Catalog Product Updated",
        catProdUpdate: updatedCatProd,
      });
    } else {
      res.status(404).send({ message: "Catalog Product Not Found" });
    }
  })
);

catProductRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteCatProd = await CatlogProduct.findById(req.params.id);
    if (deleteCatProd) {
      const catProductDeleted = await deleteCatProd.remove();
      res.send({
        message: "Catalog Product Deleted",
        deleteCatProd: catProductDeleted,
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

catProductRouter.get('/:id',expressAsyncHandler(async (req, res) => {

    
  const product = await CatlogProduct.findById(req.params.id).populate(
  );
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
})
);

export default catProductRouter;
