import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Categorychild from '../Models/CategorychildModul.js';
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from '../utils.js';

const categorychildRouter = express.Router();

categorychildRouter.get("/categorysub",expressAsyncHandler(async (req, res) => {
   
    const Categorylist = await Categorychild.find();
    console.log("Categorylist",Categorylist);

    if (Categorylist) {
        res.send(Categorylist);
    } else {
        res.status(404).send({ message: 'Men Product Not Found' });
    }
    })
  );


  categorychildRouter.post('/', isAuth, isSeller,isAdmin,isSellerOrAdmin, expressAsyncHandler(async(req, res) => {
    const category = new Categorychild({
        childcategorygroup: req.body.categorygorup,
        childcategorytype: req.body.categorytype,
        childstatus: req.body.subchildcategorystatus,
     });
     const createdCategory = await category.save();
     console.log("createdCategory===========>>>",createdCategory);
     res.send({ message: 'Product Created', category: createdCategory });
 }));
 

 export default categorychildRouter;