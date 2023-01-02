import express from 'express';
import upload from "../middleware/image.js";
import { isAuth } from "../utils.js";

const catProductRouter = express.Router();

catProductRouter.post('/', isAuth, upload.single('image'), (async(req, res) => {

    console.log("req", req);

    // const brand = new Brand({
    //     fieldname: req.file.fieldname,
    //     originalname: req.file.originalname,
    //     path: req.file.path,
    //     filename: req.file.filename,
    //     mimetype: req.file.mimetype,
    //     filename: req.file.filename,
    //     name: req.body.name,
    //     checked: req.body.checked,
    //     editor: req.body.editor,
    //     ckeditor: req.body.ckeditor,
    // });
    // const brandSaved = await brand.save();
    // res.send({ message: 'image Uploaded', image: brandSaved });

}));

export default catProductRouter;