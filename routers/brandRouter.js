import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import upload from "../middleware/image.js";
import Brand from '../Models/brandModel.js';
import { isAuth } from '../utils.js';
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';

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

export default brandRouter;