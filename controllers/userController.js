const Users=require('../models/Users');
const jwt = require("jsonwebtoken");

// MiddleWare to fetch user from token
exports.fetchuser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
  };
  
  // Create an endpoint at ip/login for login the user and giving auth-token
 exports.login = async (req, res) => {
    console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      const passCompare = req.body.password === user.password;
      if (passCompare) {
        const data = {
          user: {
            id: user.id
          }
        }
        success = true;
        console.log(user.id);
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success, token });
      }
      else {
        return res.status(400).json({ success: success, errors: "please try with correct email/password" })
      }
    }
    else {
      return res.status(400).json({ success: success, errors: "please try with correct email/password" })
    }
  };
  
  
  
  //Create an endpoint at ip/auth for regestring the user & sending auth-token
  exports.signup =  async (req, res) => {
    console.log("Sign Up");
    let success = false;
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: success, errors: "existing user found with this email" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });
    await user.save();
    const data = {
      user: {
        id: user.id
      }
    }
  
    const token = jwt.sign(data, 'secret_ecom');
    success = true;
    res.json({ success, token })
  };
  
  // Create an endpoint for saving the product in cart
  exports.addToCart =  async (req, res) => {
    console.log("Add Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added")
  };
  
  // Create an endpoint for removing the product in cart
  exports.removeFromCart = async (req, res) => {
    console.log("Remove Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    if (!userData) {
      return res.status(404).send("User not found");
    }
  
    const itemId = req.body.itemId;
    if (userData.cartData[itemId]) {
      userData.cartData[itemId] -= 1;
    }
      // Remove the item from the cart if its quantity reaches zero
      if (userData.cartData[itemId] === 0) {
        delete userData.cartData[itemId];
      }
  
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
  };
  
  
  // Create an endpoint for getting cartdata of user
  exports.getCart =  async (req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  };