import express from 'express';
import upload from "../middleware/image.js";
import { isAuth, isSeller, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import CategoryMaster from '../Models/categoryMasterModel.js';
const categoryMasterRouter = express.Router();
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';

categoryMasterRouter.post('/', isAuth, upload.single('coverimg'), (async (req, res) => {
    const categoryMaster = new CategoryMaster({
        name: req.body.name,
        checked: req.body.checked,
        parent: req.body.parent,
        description: req.body.description,
        coverimg: req.file.filename,

        // fieldname: req.file.fieldname,
        // originalname: req.file.originalname,
        // path: req.file.path,
        // filename: req.file.filename,
        // mimetype: req.file.mimetype,
        // filename: req.file.filename,
    });
    const CategoryMasteruploaded = await categoryMaster.save();
    res.send({ message: 'image Uploaded', image: CategoryMasteruploaded });
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