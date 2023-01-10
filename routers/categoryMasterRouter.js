import express from 'express';
import upload from "../middleware/image.js";
import { isAuth, isSeller, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import CategoryMaster from '../Models/categoryMasterModel.js';
const categoryMasterRouter = express.Router();
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import subCategoryMaster from '../Models/categorysubMasterModel.js';
import ThirdCategoryMaster from '../Models/categoryThirdModel.js';

categoryMasterRouter.post('/', isAuth, upload.single('coverimg'), (async (req, res) => {
    const Categoryarray = await CategoryMaster.find();
    // console.log("Categoryarray", Categoryarray)
    let childArray=[];

    for(let i=0;i<Categoryarray.length;i++){
       for(let j=0;j< Categoryarray[i].children.length;j++){
        childArray.push(Categoryarray[i].children[j])
       }
    }
    // console.log("req.body------------------->>>>", req.body)
    let categoryParent;
    if(req.body.parent!='home' && req.body.parent!='undefined'){
        categoryParent = await CategoryMaster.findById(req.body.parent);
       
        if(categoryParent){
            console.log("children push to parent");
            const subcategory = new subCategoryMaster({
            name: req.body.name,
                checked: req.body.checked,
                parent: req.body.parent,
                description: req.body.description,
                coverimg: req.file.filename,
            });
            const updatedsubcategory = await subcategory.save();
            categoryParent.children.push(updatedsubcategory);
            const updatedCategory = await categoryParent.save();
            res.status(201).send({
            message: 'Category Added',
            categorymaster:updatedCategory,
            });
        }else{
            console.log("children pused children")
            for(let k=0;k<childArray?.length;k++){
                if(childArray[k]._id==req.body.parent){
                    console.log("children as parent true")
                    const thirdcategory = new ThirdCategoryMaster({
                            name: req.body.name,
                            checked: req.body.checked,
                            parent: req.body.parent,
                            description: req.body.description,
                            coverimg: req.file.filename,
                        });
                    const updatedthirdcategory = await thirdcategory.save();
                        // console.log("updatedthirdcategory-------->>>", childArray[k].children)
                        setTimeout(()=>{
                        if(updatedthirdcategory){
                            if(childArray[k].children) {
                                childArray[k].children.push(updatedthirdcategory);
                            } else {
                                childArray[k].children = [];
                                childArray[k].children.push(updatedthirdcategory);
                            }
                            res.status(201).send({
                                message: 'Category Added',
                                categorymaster:updatedthirdcategory,
                            });
                        }
                    },10)
                }
            }
        }
    }else{
        console.log("parent create");
        const categories = new CategoryMaster({
            name: req.body.name,
            checked: req.body.checked,
            parent: req.body.parent,
            description: req.body.description,
            coverimg: req.file.filename,
        });
        const CategoryMasteruploaded = await categories.save();
        res.send({ message: 'Category created', categorymaster: CategoryMasteruploaded });
    }
    }));

categoryMasterRouter.get('/categorymasterList', expressAsyncHandler(async (req, res) => {
    const categorymaster = await CategoryMaster.find();
    if (categorymaster) {
        res.send(categorymaster);
    } else {
        res.status(404).send({ message: 'Category Not Found' });
    }
}));

categoryMasterRouter.delete('/:id', isAuth, isAdmin, isSeller, expressAsyncHandler(async (req, res) => {
    const categoryobj = await CategoryMaster.findById(req.params.id);
    if (categoryobj) {
        const deletecategory = await categoryobj.remove();
        res.send({ message: 'Category Deleted', categoryobj: deletecategory });
    } else {
        res.status(404).send({ message: 'Category Not Found' });
    }
})
);

categoryMasterRouter.put('/:id', isAuth, isAdmin, isSeller, upload.single('coverimg'), (async (req, res) => {
    const categorymasterId = req.params.id;
    const categoryobj = await CategoryMaster.findById(categorymasterId);
    if (categoryobj) {
        categoryobj.name = req.body.name;
        categoryobj.checked = req.body.checked;
        categoryobj.parent = req.body.parent;
        categoryobj.description = req.body.description;
        if (req.file === undefined) {
            categoryobj.coverimg = categoryobj.coverimg
        } else {
            categoryobj.coverimg = req.file.filename
        }
        // categoryobj.fieldname=req.file.fieldname;
        // categoryobj.originalname= req.file.originalname;
        // categoryobj.path=req.file.path;
        // categoryobj.filename= req.file.filename;
        // categoryobj.mimetype= req.file.mimetype;
        // categoryobj.filename= req.file.filename;
        const updatecategoryobj = await categoryobj.save();
        res.send({ message: 'Category Updated', categoryobj: updatecategoryobj });
    } else {
        res.status(404).send({ message: 'Category Not Found' });
    }
}));

categoryMasterRouter.get('/show/:filename', expressAsyncHandler(async (req, res) => {
    const filename = req.params.filename;
    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    gfs.files.find({ filename: filename }).toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: "no files exist"
            });
        }
        var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'uploads',
        })
        var readstream = bucket.openDownloadStreamByName(filename);
        return readstream.pipe(res);
    });
}));

export default categoryMasterRouter;