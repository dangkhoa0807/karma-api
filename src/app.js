const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const { connectDB } = require('./config/db'); // Import connectDB from db.js
const Product = require('./model/Product');
const Category = require('./model/Category');
const route = require('./routes');
const cors= require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(cors({
  origin: ['http://localhost:4200']
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resource', 'views'));

connectDB(); // Call connectDB to establish MongoDB connection

route(app);

app.use("/public", express.static("public"));


app.post('/api/karma/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.get('/api/karma/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
app.delete('/api/karma/category/delete', async (req, res) => {
  const cateDele = req.query._id;
  try {
    const deletedCategory = await Category.findByIdAndDelete(cateDele);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Không tìm thấy category để xoá" });
    }
    console.log("Deleted: ", deletedCategory);
    res.status(200).json({ message: "Xoá thành công", deletedCategory });
  } catch (error) {
    console.error("Lỗi khi xoá category: ", error);
    res.status(500).json({ error: "Đã có lỗi xảy ra khi xoá category" });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
