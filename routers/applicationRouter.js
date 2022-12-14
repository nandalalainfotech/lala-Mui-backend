import express from 'express';
import AppSetting from '../Models/applicationModel.js';
import { isAuth } from '../utils.js';
import upload from "../middleware/image.js";
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';

const applicationRouter = express.Router();

applicationRouter.post('/', isAuth, upload.single('image'), (async(req, res) => {

    console.log("req====>", req);

    // const appSetting = new AppSetting({
    //     fieldname: req.file.fieldname,
    //     originalname: req.file.originalname,
    //     filename: req.file.filename,
    //     status: req.body.status,
    //     productId : req.body.productData,
    // });
    // const appSettingUploaded = await appSetting.save();
    // console.log("appSettingUploaded", appSettingUploaded);
    // res.send({ message: 'image Uploaded', image: appSettingUploaded });
}));

export default applicationRouter;