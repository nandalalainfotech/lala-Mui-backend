import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import CategoryMain from '../Models/categorymain.js';
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from '../utils.js';

const categoryMainRouter = express.Router();

categoryMainRouter.get("/categorymaster",expressAsyncHandler(async (req, res) => {
   
    const Categorylist = await CategoryMain.find();
    if (Categorylist) {
        res.send(Categorylist);
    } else {
        res.status(404).send({ message: 'Men Product Not Found' });
    }
    })
  );

categoryMainRouter.post('/', isAuth, isSeller,isAdmin,isSellerOrAdmin, expressAsyncHandler(async(req, res) => {
    const category = new CategoryMain({
         categoryname: req.body.categoryName,
         categorytittel: req.body.categoryTittel,
         status: req.body.categorystatus,
     });
     const createdCategory = await category.save();
     res.send({ message: 'Product Created', category: createdCategory });
 }));
 

 export default categoryMainRouter;