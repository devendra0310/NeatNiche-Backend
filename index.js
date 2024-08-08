const express = require("express");
const app = express();
const cors = require("cors");
const upload=require('./middleware/multer');
const cloudinary=require('./utils/cloudinary');
require('dotenv').config();
const port = process.env.PORT || 4000;
const dbConnect=require('./config/dbConnect');
dbConnect();

app.use(express.json());
app.use(cors());

const productRoute=require('./routers/productRoute');
const userRoute=require('./routers/userRoute');
app.use('/',productRoute);
app.use('/',userRoute);

app.post("/upload", upload.single('product'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (err,result) => {
    if(err){
      console.log(err);
      return res.status(500).json({
        success:false,
        message:"Error"
      })
    } 
    res.json({
      success: 1,
      image_url: result.url
    })
  })
})
 
// Route for Images folder
// app.use('/images', express.static('upload/images'));


// ROOT API Route For Testing
app.get("/", (req, res) => {
  res.send("Root");
});

// Starting Express Server
app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});