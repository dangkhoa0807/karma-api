const Product = require("../model/Product");
const Category = require("../model/Category");

class AdminProductController {
	//handles product
  async inforProducts(req, res) {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async inforCategories(req, res) {
    try {
      const categories = await Category.find({});
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  products(req, res) {
    res.render("page/adminProduct", { layout: false });
  }
  pageAddProduct(req, res) {
    res.render("page/adminAddProduct", { layout: false });
  }
  addProduct(req, res) {
    const formData = req.body;
    formData.image = req.file.filename;
    const product = new Product(formData);

    product
      .save()
      .then((savedProduct) => {
        res
          .status(200)
          .json({status:200, message: "Thêm sản phẩm thành công", product: savedProduct });
      })
      .catch((err) => {
        console.error("Lỗi khi lưu sản phẩm:", err);
        res.status(500).json({ error: "Lỗi khi lưu sản phẩm" });
      });
  }
  async inforProduct(req, res) {
    const id = req.params._id;

    try {
      const product = await Product.findOne({ _id: id });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async updateProduct(req, res) {
    const id = req.query._id;
    const formData = req.body;

    try {
      if (req.file) {
        formData.image = req.file.filename;
      }

      const product = await Product.updateOne({ _id: id }, formData);
      res
        .status(200)
        .json({ status: 200, message: "Chỉnh sửa sản phẩm thành công", product: product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async deleProduct(req, res) {
	const id = req.query._id;
	try {
		const product = await Product.deleteOne({ _id: id })
		if (product.deletedCount === 0) {
			// Nếu không có sản phẩm bị xóa, trả về lỗi 404
			return res.status(404).json({ message: "Không tìm thấy sản phẩm để xóa" });
		}
	
		// Nếu có sản phẩm bị xóa thành công, trả về thông báo thành công
		res.status(200).json({status: 200, message: "Xóa sản phẩm thành công", product: product });

	} catch (error) {
		res.status(500).json({ error: error.message });
	}
  }

  
}

module.exports = new AdminProductController();
