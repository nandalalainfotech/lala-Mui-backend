import express from 'express';
import upload from "../middleware/image.js";
import { isAuth, isSeller, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import CategoryMaster from '../Models/categoryMasterModel.js';
const categoryMasterRouter = express.Router();

categoryMasterRouter.post('/', isAuth, upload.single('coverimg'), (async (req, res) => {
    const categoryMaster = new CategoryMaster({
        name: req.body.name,
        checked: req.body.checked,
        parent: req.body.parent,
        description: req.body.description,
        coverimg: req.body.coverimg,
      
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        path: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
    });
    const CategoryMasteruploaded = await categoryMaster.save();
    res.send({ message: 'image Uploaded', image: CategoryMasteruploaded });
}));

categoryMasterRouter.get('/categorymasterList', expressAsyncHandler(async (req, res) => {
    const categorymaster = await CategoryMaster.find();
    console.log("categorymaster======>>>>>>>>>", categorymaster)
    if (categorymaster) {
        res.send(categorymaster);
    } else {
        res.status(404).send({ message: 'Women Product Not Found' });
    }
}));

categoryMasterRouter.delete('/:id', isAuth, isAdmin, isSeller, expressAsyncHandler(async (req, res) => {
    console.log("id--Action", req.params);
    const categoryobj = await CategoryMaster.findById(req.params.id);
    if (categoryobj) {
        const deletecategory = await categoryobj.remove();
        res.send({ message: 'Product Deleted', categoryobj: deletecategory });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
})
);

export default categoryMasterRouter;