import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Categorysub from '../Models/CategorySubModel.js';
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from '../utils.js';

const categorysubRouter = express.Router();

categorysubRouter.get("/categorysub",expressAsyncHandler(async (req, res) => {
   
    const Categorylist = await Categorysub.find();
    console.log("Categorylist",Categorylist);

    if (Categorylist) {
        res.send(Categorylist);
    } else {
        res.status(404).send({ message: 'Men Product Not Found' });
    }
    })
  );


categorysubRouter.post('/', isAuth, isSeller,isAdmin,isSellerOrAdmin, expressAsyncHandler(async(req, res) => {
    const category = new Categorysub({
        subcategoryname: req.body.categoryname,
         subcategorygroup: req.body.categorygroup,
         substatus: req.body.subcategorystatus,
     });
     const createdCategory = await category.save();
     res.send({ message: 'Product Created', category: createdCategory });
 }));
 

 export default categorysubRouter;