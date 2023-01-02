import express from 'express';
import upload from "../middleware/image.js";
import CatlogProduct from '../Models/catProductModule.js';
import { isAuth } from "../utils.js";

const catProductRouter = express.Router();

catProductRouter.post('/', isAuth, async (req, res) => {

    
console.log("req", req.body);
    const brand = new CatlogProduct({
        prodname: req.body.prodname,
        user: req.user._id,
        imageId: req.body. fileId,
        summary: req.body.summary.data,
        description: req.body.description.data,
        feature: req.body.feature,
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
    console.log("req===========>>>", brandSaved);
    res.send({ message: 'Product Created', product: brandSaved });

});

export default catProductRouter;