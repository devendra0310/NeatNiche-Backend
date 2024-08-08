const Product=require('../models/Product');

// endpoint for getting all products data
exports.getAllProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("All Products");
    res.send(products);
  };
  
  
  // endpoint for getting latest products data
 exports.getNewCollection = async (req, res) => {
    let products = await Product.find({});
    let arr = products.slice(0).slice(-8);
    console.log("New Collections");
    res.send(arr);
  };
  
  
  // endpoint for getting womens products data
  exports.getPopularInWomen = async (req, res) => {
    let products = await Product.find({ category: "women" });
    let arr = products.splice(0, 4);
    console.log("Popular In Women");
    res.send(arr);
  };
  
  // endpoint for getting womens products data
  exports.getRelatedProducts =  async (req, res) => {
    console.log("Related Products");
    const {category} = req.body;
    const products = await Product.find({ category });
    const arr = products.slice(0, 4);
    res.send(arr);
  };
  
  
  // Create an endpoint for adding products using admin panel
  exports.createProduct = async (req, res) => {
    console.log("first");
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    }
    else { id = 1; }
    const product = new Product({
      id: id,
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    await product.save();
    console.log("Saved");
    res.json({ success: true, name: req.body.name })
  };
  
  
  
  // Create an endpoint for removing products using admin panel
  exports.deleteProducts = async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({ success: true, name: req.body.name })
  };
