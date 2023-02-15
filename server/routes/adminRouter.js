const express = require("express");
const AdminController = require("../controllers/admin/adminController");
const adminRouter = express();
adminRouter.post("/add/certificate", AdminController.createCertificate);
adminRouter.post("/get/certificate", AdminController.getCertificates);
adminRouter.post("/update/certificate", AdminController.updateCertificate);
adminRouter.post("/delete/certificate", AdminController.deleteCertificate);
module.exports = { adminRouter };
