import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import BrandAddress from '../Models/brandAddressModel.js';

const brandAddressRouter = express.Router();

brandAddressRouter.post("/",expressAsyncHandler(async (req, res) => {

    const brandAddress = BrandAddress({
        brand: req.body.brand,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        address: req.body.address,
        address2: req.body.address2,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        dni: req.body.dni,
        phone: req.body.phone,
        mobile: req.body.mobile,
        other: req.body.other,
    });
    const brandAddressSaved = await brandAddress.save();
    res.send({ message: "Otp Created", brandAddress: brandAddressSaved });
  })
);

brandAddressRouter.get('/brandaddresslist', expressAsyncHandler(async(req, res) => {
    const brandsAddress = await BrandAddress.find();
    if (brandsAddress) {
        res.send(brandsAddress);
    } else {
        res.status(404).send({ message: 'BrandAddress Not Found' });
    }
}));

export default brandAddressRouter;