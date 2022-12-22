import express from 'express';
import AppSetting from '../Models/applicationModel.js';
import { isAuth } from '../utils.js';
import upload from "../middleware/image.js";
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import expressAsyncHandler from 'express-async-handler';

const applicationRouter = express.Router();

applicationRouter.post('/', isAuth, upload.single('image'), (async(req, res) => {

    const appSetting = new AppSetting({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        path: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
        name: req.body.name,
    });
    const appSettingUploaded = await appSetting.save();
    res.send({ message: 'image Uploaded', image: appSettingUploaded });
}));

applicationRouter.get('/appList', expressAsyncHandler(async(req, res) => {
    const app = await AppSetting.find().sort({createdAt: -1}).limit(4);
    if (app) {
        res.send(app);
    } else {
        res.status(404).send({ message: 'Women Product Not Found' });
    }
}));

applicationRouter.get('/show/:filename', expressAsyncHandler(async(req, res) => {
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

export default applicationRouter;