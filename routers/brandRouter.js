import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import upload from "../middleware/image.js";
import Brand from '../Models/brandModel.js';
import { isAuth } from "../utils.js";

const brandRouter = express.Router();

brandRouter.post('/', isAuth, upload.single('image'), (async(req, res) => {

    const brand = new Brand({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        path: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
        name: req.body.name,
        checked: req.body.checked,
        editor: req.body.editor,
        ckeditor: req.body.ckeditor,
    });
    const brandSaved = await brand.save();
    res.send({ message: 'image Uploaded', image: brandSaved });

}));

brandRouter.get('/allbrand', expressAsyncHandler(async(req, res) => {
    const brands = await Brand.find();
    if (brands) {
        res.send(brands);
    } else {
        res.status(404).send({ message: 'Women Product Not Found' });
    }
}));

brandRouter.get('/show/:filename', expressAsyncHandler(async(req, res) => {
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

brandRouter.get('/view/:filename', expressAsyncHandler(async(req, res) => {
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

brandRouter.put('/:id', isAuth, upload.single('image'), (async(req, res) => {

    const brandUpdateId = req.params.id;
    const brandUpdate = await Brand.findById(brandUpdateId);
    if (brandUpdate) {
      brandUpdate.attributename = req.body.name;
      brandUpdate.attributetype = req.body.editor
      brandUpdate.ckeditor = req.body.ckeditor
      brandUpdate.checked = req.body.checked
      brandUpdate.fieldname = req.file.fieldname
      brandUpdate.originalname = req.file.originalname
      brandUpdate.filename = req.file.filename
      brandUpdate.mimetype = req.file.mimetype
      const updatedBrand = await brandUpdate.save();
      res.send({ message: " Updated", newbrand: updatedBrand });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

brandRouter.delete("/:id",expressAsyncHandler(async (req, res) => {

    const deleteBrand = await Brand.findById(req.params.id);
    if (deleteBrand) {
      const brandDeleted = await deleteBrand.remove();
      res.send({ message: "Brand Deleted", deleteBrand: brandDeleted });
    } else {
      res.status(404).send({ message: "Brand Not Found" });
    }
  })
);

export default brandRouter;