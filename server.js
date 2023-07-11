const express =  require('express');
const cors = require("cors");
const multer = require('multer');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("./controller/route");

const path = require('path')
const PORT = 4500;

mongoose.set('strictQuery', true);
 mongoose.connect("mongodb+srv://pranaav6703:sunny1234@cluster0.akzd3ue.mongodb.net/mydatabase?retryWrites=true&w=majority", {
   useNewUrlParser: true,
  useUnifiedTopology: true,
 });



var db = mongoose.connection;
db.on('error',()=>{console.log("Error occurred")});
db.once('open',()=>console.log("MongoDB connected"));

const app = express();
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/backend',route);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  email: String,
  condition: String,
  category: String,
  description: String,
  time: String,
  status: String,
  buyer: String,
  images: [String],
});

const Product = mongoose.model('Product', productSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage});

    const logFileUploadStart = (req, res, next) => {
      console.log('File upload starting');
      next();
    };
    
// Route to handle form submission and save the data to MongoDB
app.post('/addproduct', logFileUploadStart, upload.array('images'), (req, res) => {
    const { name, price, email, condition, category, description, time, status, buyer } = req.body;
    let images = [];
    
    if (req.files) {
      images = req.files.map((file) => file.path);
    }
  
    const newProduct = new Product({
      name,
      price,
      email,
      condition,
      category,
      description,
      time,
      status,
      buyer,
      images,
    });
    console.log(newProduct)
    try {
       newProduct.save();
      res.status(200).json({ message: 'Product saved successfully' });
    } catch (error) {
      console.error('Failed to save product:', error.mess);
      res.status(500).json({ error: 'Failed to save product' });
    }
  });

  app.get('/get-image', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(process.env.PORT || 4500, () => {
  console.log(`Server is running on port ${PORT} `)
})

module.exports = app;