const multer = require("multer");

//Image Storage Engine 
// `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      return cb(null,file.originalname)
    }
  }) 

  const upload = multer({ storage: storage });

  module.exports=upload;