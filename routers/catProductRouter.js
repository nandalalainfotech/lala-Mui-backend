import express from 'express';
import CatlogProduct from '../Models/catProductModule.js';
import { isAuth } from "../utils.js";
import expressAsyncHandler from 'express-async-handler';


const catProductRouter = express.Router();


catProductRouter.post('/', isAuth, async (req, res) => {
    const brand = new CatlogProduct({
        prodname: req.body.prodname,
        user: req.user._id,
        imageId: req.body. fileId,
        summary: req.body.summary.data,
        description: req.body.description.data,
        featureId: req.body.featureId,
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
    res.send({ message: 'Product Created', product: brandSaved });

});

catProductRouter.get('/allcatProduct', expressAsyncHandler(async(req, res) => {

    

    const catProd = await CatlogProduct.find();
    if (catProd) {
        res.send(catProd);
    } else {
        res.status(404).send({ message: 'Catalog Product Not Found' });
    }
}));

export default catProductRouter;