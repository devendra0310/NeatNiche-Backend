const express = require("express");
const router = express.Router();

const {login,signup,addToCart,removeFromCart,getCart,fetchuser}=require('../controllers/userController');

router.post('/login', login);
router.post('/signup', signup);
router.post('/addtocart', fetchuser,addToCart);
router.post('/removefromcart',fetchuser, removeFromCart);
router.post('/getcart', fetchuser, getCart);

module.exports = router;