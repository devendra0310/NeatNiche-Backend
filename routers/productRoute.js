const express = require("express");
const router = express.Router();

const {getAllProducts,getNewCollection,getPopularInWomen,getRelatedProducts,createProduct,deleteProducts}=require('../controllers/productController')

router.get("/allproducts", getAllProducts);
router.get("/newcollections", getNewCollection);
router.get("/popularinwomen", getPopularInWomen);
router.post("/relatedproducts", getRelatedProducts);
router.post("/addproduct", createProduct);
router.delete("/removeproduct", deleteProducts);

module.exports = router;